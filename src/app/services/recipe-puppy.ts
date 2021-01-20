import { Recipes } from '../interfaces/recipes';
import { RecipePuppyResponse } from '../interfaces/repositories/recipe-puppy/recipe-puppy-response';
import { Result } from '../interfaces/repositories/recipe-puppy/result';
import recipePuppyRepository from '../repositories/recipe-puppy';

class RecipePuppyService {
  public async getRecipePuppy(ingredientsQuery: string): Promise<Recipes[]> {
    let recipes = await recipePuppyRepository.getRecipePuppy(ingredientsQuery);
    return this.formatRecipePuppyResponse(recipes);
  }

  private formatRecipePuppyResponse(recipes: RecipePuppyResponse): Recipes[] {
    return recipes.results.map(recipe => ({
      title: recipe.title,
      ingredients: this.convertStringToSortedStringArray(recipe),
      link: recipe.href
    }));
  }

  private convertStringToSortedStringArray(recipe: Result): string[] {
    return [... new Set(recipe.ingredients.replace(/\, /g, ',').split(',').sort())];
  }
}

export default new RecipePuppyService();