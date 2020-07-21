const express = require('express');
const routes = express.Router();
const multer = require('../app/middlewares/multer')
const productController = require('../app/controllers/productController');


//Products
routes.get('/products/create', productController.create);
routes.get('/products/:id', productController.show);
routes.get('/products/:id/edit', productController.edit);

routes.post('/products', multer.array("photos", 6), productController.post);
routes.put('/products', multer.array("photos", 6), productController.put);
routes.delete('/products', productController.delete);

// ALIAS
routes.get('/ads/create', (req, res) => {
    return res.redirect('/products/create')
});



module.exports = routes;