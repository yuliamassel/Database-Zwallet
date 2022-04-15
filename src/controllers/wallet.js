const modWallet = require('../models/modWalet');
const { v4: uuidv4 } = require('uuid');
const helpers = require('../helper/help');
const createError = require('http-errors');
const ModTopUp = require('../models/topUp');

// POST
const createData = async (req, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { name, user_id, balance } = req.body;
    const data = {
      name,
      // eslint-disable-next-line camelcase
      user_id,
      balance
    };
    const result = await modWallet.createData(data);
    helpers.response(res, result, 200, null, 'Succes make wallet');
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError();
    next(err);
  }
};

// GET
const findData = async (req, res, next) => {
  try {
    const result = await modWallet.findData();
    helpers.response(res, result, 200);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      message: 'Internal Server Error'
    });
  }
};

const findWallet = async (req, res, next) => {
  const idUser = req.user_id;
  console.log(req.user_id);
  try {
    const user = await modWallet.BalanceWallet(idUser);
    console.log(user, 'WOI AYOLAH');
    helpers.response(res, user, 200, null, 'berhasil');
  } catch (error) {
    console.log(error);
    next(createError(500, new createError.InternalServerError()));
  }
};

// PUT atau Upadate data
const updateData = async (req, res, next) => {
  try {
    const id = req.params.id;
    // eslint-disable-next-line camelcase
    const { name, user_id, ballance } = req.body;
    const data = {
      name,
      // eslint-disable-next-line camelcase
      user_id,
      ballance
    };
    const result = await modWallet.updateData(data, id);
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
const deleteData = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await modWallet.deleteData(id);
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
const detailData = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await modWallet.detailData(id);
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

const topUpHistory = async (req, res, next) => {
  try {
    const userId = req.id;
    const sort = req.query.sort || 'date';
    const order = req.query.order || 'desc';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;
    const result = await ModTopUp.topUpHistory({
      userId,
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await ModTopUp.calculateTopUpRecordsByUserId(userId);
    const { total } = calcResult[0];
    helpers.response(
      res,
      result,
      200,
      `Data requests success! Total top up records from user with id: ${userId} are ${total}`,
      {
        currentPage: page,
        limit: limit,
        totalTransaction: total,
        totalPage: Math.ceil(total / limit)
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      message: 'Internal Server Error'
    });
  }
};

const topUpList = async (req, res, next) => {
  try {
    const sort = req.query.sort || 'date';
    const order = req.query.order || 'desc';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;
    const result = await ModTopUp.topUpList({
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await ModTopUp.calculateTopUpRecords();
    const { total } = calcResult[0];
    helpers.response(res, result, 200, 'Data requests success!', {
      currentPage: page,
      limit: limit,
      totalTransaction: total,
      totalPage: Math.ceil(total / limit)
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      message: 'Internal Server Error'
    });
  }
};

const topupBalance = async (req, res, next) => {
  try {
    const userId = req.id;
    const amountTopUp = parseInt(req.body.amount_topup);

    const [wallet] = await modWallet.searchWallet(userId);
    console.log(wallet);
    const walletId = wallet.id;
    const balance = wallet.balance;
    const income = wallet.income;
    const topUpId = uuidv4();
    const topUpDate = new Date();

    // proses penjumlahan
    const totalBalance = parseInt(balance + amountTopUp);
    const totalIncome = parseInt(income + amountTopUp);

    const dataTopUp = {
      id: topUpId,
      user_id: userId,
      wallet_id: walletId,
      amount_topup: amountTopUp,
      date: topUpDate
    };
    const dataWallet = {
      balance: totalBalance,
      income: totalIncome,
      updated_at: topUpDate
    };
    // eslint-disable-next-line no-unused-vars
    const result = await ModTopUp.topUp(dataTopUp);
    // eslint-disable-next-line no-unused-vars
    const resultWallet = await modWallet.updateData(dataWallet, walletId);

    helpers.response(
      res,
      dataTopUp,
      200,
      `Account with email: ${userId} successfully Top Up!`
    );
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      message: 'Internal Server Error'
    });
  }
};

module.exports = {
  createData,
  findData,
  updateData,
  deleteData,
  detailData,
  findWallet,
  topUpHistory,
  topUpList,
  topupBalance
};
