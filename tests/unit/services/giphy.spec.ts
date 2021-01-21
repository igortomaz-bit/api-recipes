import giphyService from '../../../src/app/services/giphy';
import giphyRepository from '../../../src/app/repositories/giphy';
import { firstCase } from '../../mocks/services/giphy';

describe('Test GiphyService', () => {
  it ('Should return an array of gif data as the same standard of the mock.', async () => {
    const giphyRepositorySpyOn = jest.spyOn(giphyRepository, 'getGiphy');
    giphyRepositorySpyOn.mockResolvedValue(firstCase.getGiphyResponse);
    const result = await giphyService.getGiphy(firstCase.recipesName);
    expect(result).toMatchObject(firstCase.waitedResult);
  })
})