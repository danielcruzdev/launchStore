const express = require('express');
const routes = express.Router();
const homeController = require('../app/controllers/homeController');

//Home
routes.get('/', homeController.index);


module.exports = routes;
