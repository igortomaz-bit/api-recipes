import redis, { RedisClient } from 'redis';
import { promisify } from 'util';

class Redis {
  private host: string;
  private port: number;
  private client: RedisClient;
  private enabled: boolean;

  constructor() {
    this.host = process.env.REDIS_HOST;
    this.port = Number(process.env.REDIS_PORT);
    this.enabled = (process.env.REDIS_ENABLE === 'true');
    this.createClient();
  }

  private createClient() {
    if (!this.enabled)
      return;

    this.client = redis.createClient({host: this.host, port: this.port});
  }

  public async getFromCache(key: string, complement: string) {
    if (!this.enabled)
      return;

    const getAsync = promisify(this.client.get).bind(this.client);

    return getAsync(`${key}${complement}`)
    .then((result: string) => {
      if (result)
        return JSON.parse(result);

      return undefined;
    })
    .catch(error => {
      throw error;
    });
} 

public async saveInCache(key: string, complement: string, content: string) {
  if (!this.enabled)
      return;

  const setAsync = promisify(this.client.set).bind(this.client);

  setAsync(`${key}${complement}`, content, 'EX', Number(process.env.REDIS_EXPIRATION))
    .then((result: string) => {
      if (result === 'OK')
        return;

      throw {
        httpStatusCode: 500,
        message: 'Problems while trying to save in Redis.'
      }
    })
    .catch(error => {
      throw error;
    });
}

}

export default new Redis();