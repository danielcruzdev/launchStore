const express = require('express');
const routes = express.Router();
const sessionController = require('./app/controllers/sessionController');


//Login
routes.get("/login", sessionController.loginForm)
routes.post("/login", sessionController.login)

//Logout
routes.post("/logout", sessionController.logout)

//Reset Password
routes.get("/forgot-password", sessionController.forgotForm)
routes.get("/password-reset", sessionController.resetForm)
routes.post("/forgot-password", sessionController.forgot)
routes.post("/password-reset", sessionController.reset)

//User register
routes.get("/register", userController.registerForm)
routes.post("/register", userController.register)

routes.post("/", userController.show)
routes.put("/", userController.update)
routes.delete("/", userController.delete)


module.exports = routes;
