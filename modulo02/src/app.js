//usando o sucrase, eh possivel utilizar a sintaxe de importacao do javascript
//de
//const express = require('express');
//const routes = require('./routes');
//para
import express from 'express';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(express.json())
  }
  routes() {
    this.server.use(routes);
  }
}
//tabem muda a sintaxe para exportar
//de
//module.exports = new App().server;
//para
export default new App().server;
