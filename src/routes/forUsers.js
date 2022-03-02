const express = require('express');
const usersController = require('../controllers/users');
const { veryfied } = require('../middleware/auth');
// const { chaceUsers } = require('../middleware/redis');
const route = express.Router();
// const commonMiddle = require('../middleware/middle');
const { upload } = require('../middleware/upload');
route
  .post('/', upload.single('photo'), usersController.postUsers)
  .get('/profile', veryfied, usersController.profile)
  .get('/', veryfied, usersController.getUsers)
  .post('/login', usersController.login)
  .post('/register', usersController.register)
  .put('/:id', upload.single('photo'), usersController.updateUsers)
  .put(
    '/profile/photo',
    veryfied,
    upload.single('photo'),
    usersController.addPhoto
  )
  .delete('/:id', veryfied, usersController.deleteUsers)
  .get('/:id', veryfied, usersController.detailUsers);

module.exports = route;
