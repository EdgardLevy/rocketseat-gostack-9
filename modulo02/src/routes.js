//const { Router } = require('express');
import Router from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  res.send('Hello Omni teste');
})

//module.exports = routes;
export default routes;
