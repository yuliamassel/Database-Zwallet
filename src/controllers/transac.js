
// const { v4: uuidv4 } = require('uuid');
const modDeal = require('../models/modDeal');
const modWallet = require('../models/modWalet');
// const modUser = require('../models/modUser');
const helpers = require('../helper/help');
const createError = require('http-errors');

// POST
const createDeal = async (req, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { source_id, destination_id, notes } = req.body;
    const amountTransfer = parseInt(req.body.amount);
    const [walletSender] = await modWallet.searchWallet(source_id);
    const balanceSender = walletSender.balance;
    const expenseSender = walletSender.expense;
    const [walletReceiver] = await modWallet.searchWallet(destination_id);
    const balanceReceiver = walletReceiver.balance;
    const incomeReceiver = walletReceiver.balance;
    const totalSenderBalance = parseInt(balanceSender - amountTransfer);
    const totalSenderExpense = parseInt(expenseSender + amountTransfer);

    const totalReceiverBalance = parseInt(balanceReceiver + amountTransfer);
    const totalReceiverIncome = parseInt(incomeReceiver + amountTransfer);
    const data = {
      // eslint-disable-next-line camelcase
      source_id: source_id,
      // eslint-disable-next-line camelcase
      destination_id: destination_id,
      amount: amountTransfer,
      date: new Date(),
      notes: notes
    };

    const dataWalletSender = {
      balance: totalSenderBalance,
      expense: totalSenderExpense,
      updated_at: new Date()
    };

    const dataWalletReceiver = {
      balance: totalReceiverBalance,
      income: totalReceiverIncome,
      updated_at: new Date()
    };

    const result = await modDeal.createDeal(data, dataWalletSender, dataWalletReceiver);
    console.log(result, 'ini di BACKEND');
    helpers.resTransfer(res, data, 200, null, 'Transaction succes');
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError();
    next(err);
  }
};

// GET
const findDeal = async (req, res, next) => {
  try {
    const result = await modDeal.findDeal();
    helpers.response(res, result, 200);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      message: 'Internal Server Error'
    });
  }
};

// PUT atau Upadate data
const updateDeal = async (req, res, next) => {
  try {
    const id = req.params.id;
    // eslint-disable-next-line camelcase
    const { source_id, destination_id, amount, balance_left, notes } = req.body;
    const data = {
      // eslint-disable-next-line camelcase
      source_id, destination_id, amount, balance_left, notes
    };
    const result = await modDeal.updateDeal(data, id);
    res.json({
      result: result
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      message: 'Internal Server Error'
    });
  }
};

// DELETE
const deleteDeal = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await modDeal.deleteDeal(id);
    res.json({
      result: result
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      message: 'Internal Server Error'
    });
  }
};

// GET DETAIL
const detailDeal = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await modDeal.detailDeal(id);
    res.json({
      result: result
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      message: 'Internal Server Error'
    });
  }
};
// const profile = async (req, res, next) => {
//   const email = req.email;
//   console.log(req.email);
//   try {
//     const user = await modDeal.getUserByEmail(email);
//     console.log(user);
//     helpers.response(res, user, 200, null, 'berhasil');
//   } catch (error) {
//     console.log(error);
//     next(createError(500, new createError.InternalServerError()));
//   }
// };

const history = async (req, res, next) => {
  try {
    const userId = req.id;
    const sort = req.query.sort || 'date';
    const order = req.query.order || 'desc';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;
    const result = await modDeal.history({
      userId,
      sort,
      order,
      limit,
      offset
    });

    console.log(result);

    const calcResult = await modDeal.getTransactionByUserId(
      userId
    );
    const { total } = calcResult[0];
    helpers.response(
      res,
      200,
      result,
      `Data requests success! Total transactions from user with id: ${userId} are ${total}`,
      {
        currentPage: page,
        limit: limit,
        totalTransaction: total,
        totalPage: Math.ceil(total / limit)
      }
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: 'Internal Server Error!' });
  }
};

module.exports = {
  createDeal,
  findDeal,
  updateDeal,
  deleteDeal,
  detailDeal,
  history
};
