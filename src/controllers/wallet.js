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
    res.json({
      result: result
    });
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
  detailData
};
