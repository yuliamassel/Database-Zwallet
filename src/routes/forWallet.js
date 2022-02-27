const express = require('express');
const walletController = require('../controllers/wallet');
const route = express.Router();

route
  .post('/', walletController.createData)
  .get('/', walletController.findData)
  .get('/wallet-info', walletController.findWallet)
  .put('/:id', walletController.updateData)
  .delete('/:id', walletController.deleteData)
  .get('/:id', walletController.detailData);

module.exports = route;
