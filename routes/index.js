import express from 'express';
import AuthController from '../controllers/AuthController.js';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const router = express.Router();
const routeController = (app) => {
  app.use('/', router);
	
  router.get('/status' , (req, res) => {
    AppController.getStatus(req, res);
});

  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
});

  router.get('/users/me', (req, res) => {
    UsersController.getMe(req, res);
  });

  router.post('/users', (req, res) => {
    UsersController.postNew(req, res);
  });

  router.get('/connect', (req, res) => {
    AuthController.getConnect(req, res);
  });

  router.get('/disconnect', (req, res) => {
    AuthController.getDisconnect(req, res);
  });

}

export default routeController;
