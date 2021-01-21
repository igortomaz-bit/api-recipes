import { Request, Response, NextFunction } from 'express';
import recipesService from '../services/recipes';
import { Validation } from '../utils/validation';

class RecipesController {
  public async getRecipes(request: Request, response: Response, next: NextFunction) {
    const ingredients = request.query.i.toString();
    let recipes: any;

    try {
      Validation.validateIngredientsQuantity(ingredients);
      recipes = await recipesService.getRecipes(ingredients);
    } catch (error) {
      return next(error)
    }

    return response.status(200).json(recipes);
  }
}

export default new RecipesController();