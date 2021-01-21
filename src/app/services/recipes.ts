import { GiphyFormattedResponse } from '../interfaces/services/giphy/giphy-formatted-response';
import { RecipsResponse } from '../interfaces/recipes-response';
import recipePuppyService from './recipe-puppy';
import giphyService from './giphy'
import { Recipes } from '../interfaces/recipes';

class RecipesService {
  public async getRecipes(ingredientsQuery: string): Promise<RecipsResponse> {
    const recipesPuppy = await recipePuppyService.getRecipePuppy(ingredientsQuery);
    const recipeTitles = this.getRecipesTitle(recipesPuppy);
    const giphies = await giphyService.getGiphy(recipeTitles);
    const recipes = this.includeGifInResult(recipesPuppy, giphies);

    if (!recipes.length)
      throw {
        httpStatusCode: 404,
        message: 'Gifs for these ingredients was not found.'
      }

    return this.formatResponse(ingredientsQuery, recipes)
  }

  private formatResponse(ingredientsQuery: string, recipes: Recipes[]) {
    return {
      keywords: this.getIngredientsArray(ingredientsQuery),
      recipes
    };
  }

  private getIngredientsArray(ingredientsQuery: string) {
    return ingredientsQuery.replace(/\ /g, '').split(',');
  }

  private includeGifInResult(recipes: Recipes[], giphies: GiphyFormattedResponse[]): Recipes[] {
    return recipes.map(recipe => {
      const result = this.getUsedGIf(giphies, recipe);

      if (result)
        return {
          ...recipe,
          gif: result.gif
        };
    }).filter(recipe => recipe);
  }

  private getUsedGIf(giphies: GiphyFormattedResponse[], recipe: Recipes) {
    return giphies.find(giphyItem => giphyItem.recipeName === recipe.title);
  }

  private getRecipesTitle(recipes: Recipes[]): string[] {
    return recipes.map(recipe => recipe.title);
  }
}

export default new RecipesService();