const { Router } = require('express');

const SessionController = require('../../controllers/SessionController');

const sessioncontroller = new SessionController();
const routes = Router();

routes.post('/create', sessioncontroller.store);
routes.post('/forgot_password', sessioncontroller.forgotPassword);
routes.post('/reset_password', sessioncontroller.resetPassword);


module.exports = routes;
