import axios from 'axios';
import { RecipePuppyResponse } from '../interfaces/repositories/recipe-puppy/recipe-puppy-response';

class RecipePuppyRepository {
  private host: string;
  
  constructor() {
    this.host = `http://www.recipepuppy.com/api/?i=`;
  }

  public async getRecipePuppy(ingredients: string): Promise<RecipePuppyResponse> {
    return axios.get(`${this.host}${ingredients}`)
    .then((result) => {
      if (result.status === 200 && result.data && Object.keys(result.data).length)
        return result.data;

      throw {
        httpStatusCode: 404,
        message: `Result of recipe puppy api not found.`
      }
    })
    .catch((error) => {
      error.message = `Error: ${error.message}.`;
      error.apiName = 'Recipe Puppy';
      throw error;
    });
  }
}

export default new RecipePuppyRepository();