import axios from 'axios';
import redisRepository from './redis';

class GiphyRepository {
  private repositoryKey: string;
  private host: string;
  private apiKey: string;

  constructor() {
    this.host = `https://api.giphy.com/v1/gifs/search`;
    this.apiKey = process.env.GIPHY_API_KEY;
    this.repositoryKey = process.env.GIPHY_REDIS_KEY;
  }

  public async getGiphy(recipeName: string) {
    const result = await redisRepository.getFromCache(this.repositoryKey, recipeName);

    if (result)
      return result;

    const encodedRecipeName = recipeName.replace(/ /g, '%20').toLowerCase();
    return axios.get(`${ this.host}?api_key=${this.apiKey}&q=${encodedRecipeName}&limit=5&rating=g`)
    .then(async (result) => {
      if (result.status === 200 && result.data && result.data.data) {
        const answer = {
          recipeName,
          data: result.data.data
        };

        await redisRepository.saveInCache(this.repositoryKey, recipeName, JSON.stringify(answer))
      }
      throw {
        httpStatusCode: 404,
        message: `Result giphy api not found.`
      }
    })
    .catch((error) => {
      error.message = `Error: ${error.message}.`;
      error.apiName = 'Giphy';
      throw error;
    });
  }
}

export default new GiphyRepository();