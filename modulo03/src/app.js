// usando o sucrase, eh possivel utilizar a sintaxe de importacao do javascript
// de
// const express = require('express');
// const routes = require('./routes');
// para
import 'dotenv/config';
import express from 'express';
import path from 'path';
import Youch from 'youch';
// Estudar mais o sentry
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';
import 'express-async-errors';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({
        error: 'Internal server error',
      });
    });
  }
}
// tabem muda a sintaxe para exportar
// de
// module.exports = new App().server;
// para
export default new App().server;
