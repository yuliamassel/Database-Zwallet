const express = require('express');
const transacController = require('../controllers/transac');
const route = express.Router();
const { veryfied } = require('../middleware/auth');

route
  .post('/', veryfied, transacController.createDeal)
  .get('/', transacController.findDeal)
  .put('/:id', transacController.updateDeal)
  .delete('/:id', transacController.deleteDeal)
  .get('/:id', transacController.detailDeal);

module.exports = route;
