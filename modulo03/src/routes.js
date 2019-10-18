// const { Router } = require('express');
import Router from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
// instancia o multer com as configuracloes
const upload = multer(multerConfig);

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
routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.Index);
routes.post('/files', upload.single('file'), FileController.store);
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);
routes.get('/schedule', ScheduleController.index);
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// module.exports = routes;
export default routes;
