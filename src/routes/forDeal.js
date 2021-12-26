const express = require('express');
const transacController = require('../controllers/transac');
const route = express.Router();

route
  .post('/', transacController.createDeal)
  .get('/', transacController.findDeal)
  .put('/:id', transacController.updateDeal)
  .delete('/:id', transacController.deleteDeal)
  .get('/:id', transacController.detailDeal);

module.exports = route;
