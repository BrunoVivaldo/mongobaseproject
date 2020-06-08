const { Router } = require('express');

const auth = require('../auth');
const UserController = require('../../controllers/UserController');

const userController = new UserController();
const routes = Router();

routes.get('/', auth.required, userController.index);
routes.put('/', auth.required, userController.update);
routes.delete('/', auth.required, userController.destroy);
routes.post('/create', userController.store);
routes.get('/:id', auth.required, userController.show);


module.exports = routes;
