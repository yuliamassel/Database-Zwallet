const express = require('express');
const walletController = require('../controllers/wallet');
const { veryfied } = require('../middleware/auth');
const route = express.Router();

route
  .post('/', walletController.createData)
  .post('/topup', veryfied, walletController.topupBalance)
  .get('/topup-list', veryfied, walletController.topUpList)
  .get('/', walletController.findData)
  .get('/wallet-info', walletController.findWallet)
  .put('/:id', walletController.updateData)
  .delete('/:id', walletController.deleteData)
  .get('/:id', walletController.detailData);

module.exports = route;
