import redis, { RedisClient } from 'redis';
import { promisify } from 'util';

class Redis {
  private host: string;
  private port: number;
  private client: RedisClient;

  constructor() {
    this.host = process.env.REDIS_HOST;
    this.port = Number(process.env.REDIS_PORT);
    this.createClient();
  }

  private createClient() {
    this.client = redis.createClient({host: this.host, port: this.port});
  }

  public async getFromCache(key: string, complement: string) {
    const getAsync = promisify(this.client.get).bind(this.client);

    return getAsync(`${key}${complement}`)
    .then((result: string) => {
      if (result)
        return JSON.parse(result);

      return undefined;
    })
    .catch(error => {
      return undefined;
    });
} 

public async saveInCache(key: string, complement: string, content: string) {
  const setAsync = promisify(this.client.set).bind(this.client);

  return setAsync(`${key}${complement}`, content)
    .then((result: string) => {
      if (result)
        return JSON.parse(result);

      return undefined;
    })
    .catch(error => {
      return undefined;
    });
}

}

export default new Redis();