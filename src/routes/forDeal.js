const express = require('express');
const transacController = require('../controllers/transac');
const route = express.Router();
// const { veryfied } = require('../middleware/auth');

route
  .post('/', transacController.createDeal)
  // .get('/profile', veryfied, transacController.profile)
  .get('/', transacController.findDeal)
  .get('/history', transacController.history)
  .put('/:id', transacController.updateDeal)
  .delete('/:id', transacController.deleteDeal)
  .get('/:id', transacController.detailDeal);

module.exports = route;
