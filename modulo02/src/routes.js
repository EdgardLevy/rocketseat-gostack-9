// const { Router } = require('express');
import Router from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

/*
routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Edgard',
    email: 'edgardlevy@gmail.com',
    password_hash: 'adas',
  });

  return res.json(user);
});
*/

routes.post('/users', UserController.store);
// routes.put('/users', authMiddleware, UserController.update);
routes.post('/sessions', SessionController.store);
// uso global do middleware,
routes.use(authMiddleware); // <<apos o uso desse middleware, todas as rotas abaixo estarao protegidas
routes.put('/users', UserController.update);

// module.exports = routes;
export default routes;
