const express = require('express');
const { registerUser, loginUser, getUsers } = require('../userController');
const { UserRegistryValidate, userLoginValidate } = require('../utils/userValidate');
const { ensureAuthenticated } = require('../utils/auth');
const routes = express.Router();



routes.post('/register', UserRegistryValidate ,registerUser);

routes.post('/login', userLoginValidate, loginUser);

routes.get('/users', ensureAuthenticated, getUsers);


module.exports = routes;