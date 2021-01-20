import { Request, Response, NextFunction } from 'express';
import recipesService from '../services/recipes';

class RecipesController {
  public async getRecipes(request: Request, response: Response, next: NextFunction) {
    const self = this;
    const { i } = request.query;
    let recipes: any;

    try {
      recipes = await recipesService.getRecipes(i.toString());
    } catch (error) {
      return next(error)
    }

    return response.status(200).json(recipes);
  }
}

export default new RecipesController();