import axios from 'axios';
import { RecipePuppyResponse } from '../interfaces/repositories/recipe-puppy/recipe-puppy-response';
import redisRepository from './redis';

class RecipePuppyRepository {
  private host: string;
  private repositoryKey: string;
  
  constructor() {
    this.host = `http://www.recipepuppy.com/api/?i=`;
    this.repositoryKey = process.env.RECIPE_PUPPY_REDIS_KEY;
  }

  public async getRecipePuppy(ingredients: string): Promise<RecipePuppyResponse> {
    const result = await redisRepository.getFromCache(this.repositoryKey, ingredients);

    if (result)
      return result;

    return axios.get(`${this.host}${ingredients}`)
    .then((result) => {
      if (result.status === 200 && result.data && Object.keys(result.data).length) {
        redisRepository.saveInCache(this.repositoryKey, ingredients, JSON.stringify(result.data))
        return result.data;
      }

      throw {
        httpStatusCode: 204,
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