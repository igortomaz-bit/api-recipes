import recipesService from '../../../src/app/services/recipes';
import recipePuppyPuppy from '../../../src/app/services/recipe-puppy';
import giphyService from '../../../src/app/services/giphy';
import { firstCase, secondCase } from '../../mocks/services/recipes';

describe('Test RecipesService', () => {
  it ('Should return an array of gif data as the same standard of the mock.', async () => {
    const recipesServiceSpyOn = jest.spyOn(recipePuppyPuppy, 'getRecipePuppy');
    const giphyServiceSpyOn = jest.spyOn(giphyService, 'getGiphy');
    recipesServiceSpyOn.mockResolvedValue(firstCase.getRecipePuppyResponse);
    giphyServiceSpyOn.mockResolvedValue(firstCase.getGiphyResponse);
    const result = await recipesService.getRecipes(firstCase.ingredientsQuery);
    expect(result).toMatchObject(firstCase.waitedResult);
  });

  it ('Should return a 404 exception for gifs not found.', async () => {
    const recipesServiceSpyOn = jest.spyOn(recipePuppyPuppy, 'getRecipePuppy');
    const giphyServiceSpyOn = jest.spyOn(giphyService, 'getGiphy');
    recipesServiceSpyOn.mockResolvedValue(firstCase.getRecipePuppyResponse);
    giphyServiceSpyOn.mockResolvedValue([]);
    
    try {
      await recipesService.getRecipes(firstCase.ingredientsQuery);
    } catch (error) {
      expect(error).toMatchSnapshot(secondCase.exceptionObject);
    }
    
  });
})