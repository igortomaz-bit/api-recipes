import { Router } from 'express';
import recipesController from '../controllers/recipes';

class Routes {
  routes: Router;

  constructor() {
    this.routes = Router();
    this.buildRecipesRoute();
  }

  private buildRecipesRoute() {
    this.routes.get('/recipes', recipesController.getRecipes);
  }
}

export default new Routes().routes;