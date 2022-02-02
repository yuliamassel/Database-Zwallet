const express = require('express');
const usersController = require('../controllers/users');
const { veryfied, isAdmin } = require('../middleware/auth');
const { chaceUsers } = require('../middleware/redis');
const route = express.Router();
// const commonMiddle = require('../middleware/middle');
const { upload } = require('../middleware/upload');
route
  .post('/', upload.single('photo'), usersController.postUsers)
  .get('/profile', veryfied, usersController.profile)
  .get('/', veryfied, usersController.getUsers)
  .post('/login', usersController.login)
  .post('/register', usersController.register)
  .put('/:id', veryfied, usersController.updateUsers)
  .delete('/:id', veryfied, isAdmin, usersController.deleteUsers)
  .get('/:id', veryfied, chaceUsers, usersController.detailUsers);

module.exports = route;
