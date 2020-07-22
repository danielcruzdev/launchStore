const express = require('express');
const routes = express.Router();
const SearchController = require('../app/controllers/SearchController');

//Search
routes.get("/products/search", SearchController.index)

module.exports = routes;
