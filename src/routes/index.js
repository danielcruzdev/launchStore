const express = require('express');
const routes = express.Router();

const users = require("./usersRoute");
const home = require("./homeRoute");
const search = require("./searchRoute");
const product = require("./productsRoute");

routes.use("/users", users)
routes.use(home)
routes.use(search)
routes.use(product)

module.exports = routes;