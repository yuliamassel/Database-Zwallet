const express = require('express');
const transacController = require('../controllers/transac');
const { veryfied } = require('../middleware/auth');
const route = express.Router();
// const { veryfied } = require('../middleware/auth');

route
  .post('/', transacController.createDeal)
  .get('/', transacController.findDeal)
  .get('/history', veryfied, transacController.history)
  .put('/:id', transacController.updateDeal)
  .delete('/:id', transacController.deleteDeal)
  .get('/:id', transacController.detailDeal);

module.exports = route;
