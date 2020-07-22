const express = require('express');
const routes = express.Router();
const HomeController = require('../app/controllers/HomeController');

//Home
routes.get('/', HomeController.index);


module.exports = routes;
