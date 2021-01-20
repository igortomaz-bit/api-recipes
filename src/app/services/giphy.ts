import { GiphyResponse } from '../interfaces/repositories/giphy/giphy-response';
import { GiphyFormattedResponse } from '../interfaces/services/giphy/giphy-formatted-response';
import giphyRepository from '../repositories/giphy';

class GiphyService {
  public async getGiphy(recipesName: string[]) {
    const giphyPromises = this.getGiphyPromises(recipesName);
    return await this.getGiphyResults(giphyPromises);
  }

  private async getGiphyResults(giphyPromises: Promise<{ recipeName: string; data: any; }>[]) {
    return await Promise.all(giphyPromises).then(results => {
      return this.buildGifsObjects(results);
    });
  }

  private getGiphyPromises(recipesName: string[]) {
    return recipesName.map(recipieName => giphyRepository.getGiphy(recipieName));
  }

  private buildGifsObjects(results: GiphyResponse[]): GiphyFormattedResponse[] {
    return results.map(result => ({
      recipeName: result.recipeName,
      gif: result.data[0].images.original.url
    }));
  }
}

export default new GiphyService();