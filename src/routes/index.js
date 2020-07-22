const express = require('express');
const routes = express.Router();

const users = require("./UsersRoute");
const home = require("./HomeRoute");
const search = require("./SearchRoute");
const product = require("./ProductsRoute");

routes.use("/users", users)
routes.use(home)
routes.use(search)
routes.use(product)

module.exports = routes;