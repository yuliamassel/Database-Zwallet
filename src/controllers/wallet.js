const modWallet = require('../models/modWalet');
const helpers = require('../helper/help');
const createError = require('http-errors');

// POST
const createData = async (req, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { name, user_id, ballance } = req.body;
    const data = {
      name,
      // eslint-disable-next-line camelcase
      user_id,
      ballance
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

module.exports = {
  createData,
  findData,
  updateData,
  deleteData,
  detailData,
  findWallet
};
