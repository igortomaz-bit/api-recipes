import recipePuppyService from '../../../src/app/services/recipe-puppy';
import recipePuppyRepository from '../../../src/app/repositories/recipe-puppy';
import { firstCase } from '../../mocks/services/recipe-puppy';

describe('Test RecipePuppyService', () => {
  it ('Should return an array of recipes puppy data as the same standard of the mock.', async () => {
    const recipePuppyRepositorySpyOn = jest.spyOn(recipePuppyRepository, 'getRecipePuppy');
    recipePuppyRepositorySpyOn.mockResolvedValue(firstCase.getRecipePuppyResponse);
    const result = await recipePuppyService.getRecipePuppy(firstCase.ingredientsQuery);
    expect(result).toMatchObject(firstCase.waitedResult);
  })
})