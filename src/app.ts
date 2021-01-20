import express, { Express } from 'express';
import exceptionMiddleware from './app/middlewares/exception'
import routes from './app/routes';

class App {
  server: Express;

  constructor() {
    this.server = express();
    this.routes();
    this.middlewares();
  }

  routes() {
    this.server.use(routes);
  }

  middlewares() {
    this.server.use(exceptionMiddleware.catch);
  }
}

export default new App();