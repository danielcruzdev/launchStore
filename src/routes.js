const express = require('express');
const routes = express.Router();
const productController = require('./app/controllers/productController');

//Instructors Routes
routes.get('/', (req, res) => {
    return res.render("layout.njk")
});

routes.get('/products/create', productController.create);

routes.get('/ads/create', (req, res) => {
    return res.redirect('/products/create')
});






module.exports = routes;
