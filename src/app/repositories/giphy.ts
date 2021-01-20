import axios from 'axios';

class GiphyRepository {
  private host: string;
  private apiKey: string;

  constructor() {
    this.host = `https://api.giphy.com/v1/gifs/search`;
    this.apiKey = process.env.GIPHY_API_KEY;
  }

  public async getGiphy(recipeName: string) {
    return axios.get(`${ this.host}?api_key=${this.apiKey}&q=${recipeName}&limit=5&rating=g`)
    .then((result) => {
      if (result.status === 200 && result.data && result.data.data)
        return {
          recipeName,
          data: result.data.data
        };

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