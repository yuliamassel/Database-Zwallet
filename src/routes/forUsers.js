const express = require('express');
const usersController = require('../controllers/users');
const { veryfied } = require('../middleware/auth');
const route = express.Router();
const commonMiddle = require('../middleware/middle');
route
  .post('/', commonMiddle.callUsers, usersController.postUsers)
  .get('/', veryfied, usersController.getUsers)
  .post('/login', usersController.login)
  .post('/register', usersController.register)
  .put('/:id', usersController.updateUsers)
  .delete('/:id', usersController.deleteUsers)
  .get('/:id', usersController.detailUsers);

module.exports = route;
