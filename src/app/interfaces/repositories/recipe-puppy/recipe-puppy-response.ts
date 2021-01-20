import { Result } from "./result";

export interface RecipePuppyResponse {
  href: string;
  results: Result[];
  title: string;
  version: number;
}