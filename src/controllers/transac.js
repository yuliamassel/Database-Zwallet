
// const { v4: uuidv4 } = require('uuid');
const modDeal = require('../models/modDeal');
// const modUser = require('../models/modUser');
const helpers = require('../helper/help');
const createError = require('http-errors');

// POST
const createDeal = async (req, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { source_id, destination_id, amount, balance_left, notes } = req.body;
    const data = {
      // eslint-disable-next-line camelcase
      source_id: source_id,
      // eslint-disable-next-line camelcase
      destination_id: destination_id,
      amount: amount,
      // eslint-disable-next-line camelcase
      balance_left: balance_left,
      create_at: new Date(),
      notes: notes
    };
    const result = await modDeal.createDeal(data);
    // const email = req.email;
    // const senderWallet = await modUser.getUserByEmail(email);
    // console.log(senderWallet, 'ini WALLET');
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
const profile = async (req, res, next) => {
  const email = req.email;
  console.log(req.email);
  try {
    const user = await modDeal.getUserByEmail(email);
    console.log(user);
    helpers.response(res, user, 200, null, 'berhasil');
  } catch (error) {
    console.log(error);
    next(createError(500, new createError.InternalServerError()));
  }
};

const history = async (req, res, next) => {
  try {
    const userId = req.id;
    const sort = req.query.sort || 'date';
    const order = req.query.order || 'desc';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;
    const result = await modDeal.history({
      userId,
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await modDeal.getTransactionByUserId(
      userId
    );
    const { total } = calcResult[0];
    helpers.resTransfer(
      res,
      result,
      200,
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
  profile,
  history
};
