const express = require('express')
const usersController = require('../controllers/users')
const route = express.Router()

route
    .post('/',usersController.postUsers)
    .get('/', usersController.getUsers)
    .put('/:id',usersController.updateUsers)
    .delete('/:id',usersController.deleteUsers)
    .get('/:id',usersController.detailUsers)


    module.exports=route