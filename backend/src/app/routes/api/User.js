const { Router } = require('express');

const auth = require('../auth');
const UserController = require('../../controllers/UserController');
const {
  indexValidator, updateValidator, destroyValidator, storeValidator, showValidator,
} = require('../../controllers/validators/User');

const userController = new UserController();
const routes = Router();

routes.get('/', auth.required, indexValidator, userController.index);
routes.put('/', auth.required, updateValidator, userController.update);
routes.delete('/', auth.required, destroyValidator, userController.destroy);
routes.post('/create', storeValidator, userController.store);
routes.get('/:id', auth.required, showValidator, userController.show);


module.exports = routes;
