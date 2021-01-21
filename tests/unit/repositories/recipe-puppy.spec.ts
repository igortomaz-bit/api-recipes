import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import recipePuppyRepository from '../../../src/app/repositories/recipe-puppy';
import { firstCase, secondCase } from '../../mocks/repositories/recipe-puppy';

describe('Test RecipeRepository', () => {
  it ('Should return an object with format {recipeName: ..., data: ...} with the correct answers.', (done) => {
    let axiosMock = new MockAdapter(axios);
    const data = firstCase.dataResult;
    const mockUrl = `http://www.recipepuppy.com/api/?i=tomato,onion`;
    axiosMock.onGet(mockUrl).reply(200, { data } );
    recipePuppyRepository.getRecipePuppy(firstCase.ingredients)
    .then(result => {
      expect(result).toMatchObject(firstCase.waitedResult);
      done();
    })
  }, 10000);

  it ('Should return an exception object for empty answer.', (done) => {
    let axiosMock = new MockAdapter(axios);
    const mockUrl = `http://www.recipepuppy.com/api/?i=tomato,onion`;
    axiosMock.onGet(mockUrl).reply(200, {  } );
    recipePuppyRepository.getRecipePuppy(firstCase.ingredients)
    .catch(result => {
      expect(result).toMatchObject(secondCase.exceptionObject);
      done();
    });
  }, 10000);
})