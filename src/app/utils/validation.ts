export class Validation {
  public static validateIngredientsQuantity(ingredients: string) {
    const ingredientsArray = ingredients.replace(/\ /g, '').split(',');

    if (ingredientsArray.length > 3)
      throw { httpStatusCode: 400 }
  }
}