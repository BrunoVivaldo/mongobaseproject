const { Router } = require('express');


const sessionRoutes = require('./api/Session');
const userRoutes = require('./api/User');


const routes = Router();


routes.use('/user', userRoutes);
routes.use('/session', sessionRoutes);

module.exports = routes;
