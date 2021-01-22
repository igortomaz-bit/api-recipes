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
    const encodedRecipeName = recipeName.replace(/ /g, '%20').toLowerCase();
    const result = await redisRepository.getFromCache(this.repositoryKey, encodedRecipeName);

    if (result)
      return result;

    return axios.get(`${ this.host}?api_key=${this.apiKey}&q=${encodedRecipeName}&limit=5&rating=g`)
    .then((result) => {
      if (result.status === 200 && result.data && result.data.data) {
        const answer = {
          recipeName,
          data: result.data.data
        };

        redisRepository.saveInCache(this.repositoryKey, encodedRecipeName, JSON.stringify(answer))
        return answer;
      }

      throw {
        httpStatusCode: 204,
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