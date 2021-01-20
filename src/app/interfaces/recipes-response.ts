import { Recipes } from "./recipes";

export interface RecipsResponse {
  keywords: string[];
  recipes: Recipes[]
}