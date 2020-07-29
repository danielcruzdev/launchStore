const express = require('express');
const routes = express.Router();
const multer = require('../app/middlewares/multer')
const ProductController = require('../app/controllers/ProductController');
const { onlyUsers } = require('../app/middlewares/session')


//Products
routes.get('/products/create', onlyUsers, ProductController.create);
routes.get('/products/:id', ProductController.show);
routes.get('/products/:id/edit', onlyUsers, ProductController.edit);

routes.post('/products', onlyUsers, multer.array("photos", 6), ProductController.post);
routes.put('/products', onlyUsers, multer.array("photos", 6), ProductController.put);
routes.delete('/products', onlyUsers, ProductController.delete);

// ALIAS
routes.get('/ads/create', (req, res) => {
    return res.redirect('/products/create')
});
 
module.exports = routes;