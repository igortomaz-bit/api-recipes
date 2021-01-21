import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import giphyRepository from '../../../src/app/repositories/giphy';
import { firstCase, secondCase } from '../../mocks/repositories/giphy';

describe('Test GiphyRepository', () => {
  it ('Should return an object with format {recipeName: ..., data: ...} with the correct answers.', (done) => {
    let axiosMock = new MockAdapter(axios);
    const data = firstCase.dataResult;
    const mockUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=simply%20easy%20sorbet%20recipe&limit=5&rating=g`;
    axiosMock.onGet(mockUrl).reply(200, { data } );
    giphyRepository.getGiphy(firstCase.recipeName)
    .then(result => {
      expect(result).toMatchObject(firstCase.waitedResult);
      done();
    })
  }, 10000);

  it ('Should a 404 exception for result not found.', (done) => {
    let axiosMock = new MockAdapter(axios);
    const mockUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=simply%20easy%20sorbet%20recipe&limit=5&rating=g`;
    axiosMock.onGet(mockUrl).reply(200, {} );
    giphyRepository.getGiphy(firstCase.recipeName)
    .catch(result => {
      expect(result).toMatchObject(secondCase.exceptionObject);
      done();
    });
 
  }, 10000);
})