const express = require('express');
const routes = express.Router();
const searchController = require('../app/controllers/searchController');

//Search
routes.get("/products/search", searchController.index)

module.exports = routes;
