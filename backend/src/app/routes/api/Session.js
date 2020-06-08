const { Router } = require('express');

const {
  storeValidator, forgotPasswordValidator, resetPasswordValidator,
} = require('../../controllers/validators/Session');

const SessionController = require('../../controllers/SessionController');

const sessioncontroller = new SessionController();
const routes = Router();

routes.post('/create', storeValidator, sessioncontroller.store);
routes.post('/forgot_password', forgotPasswordValidator, sessioncontroller.forgotPassword);
routes.post('/reset_password', resetPasswordValidator, sessioncontroller.resetPassword);


module.exports = routes;
