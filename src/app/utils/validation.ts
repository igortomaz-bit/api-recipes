export class Validation {
  public static parameters(ingredients: string) {
    const ingredientsArray = ingredients.replace(/\ /g, '').split(',').filter(element => element);

    if (ingredientsArray.length > 3)
      throw { 
        httpStatusCode: 400,
        message: 'Number of ingredients is bigger than 3.'
      }

    if (!ingredientsArray.length)
    throw {
      httpStatusCode: 400,
      message: 'Request without ingredients.'
    }
  }
}