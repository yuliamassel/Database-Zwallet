
const modDeal = require('../models/modDeal');
const helpers = require('../helper/help');
const createError = require('http-errors');

// POST
const createDeal = async (req, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { source_id, destination_id, amount, balance_left, notes } = req.body;
    const data = {
      // eslint-disable-next-line camelcase
      source_id,
      // eslint-disable-next-line camelcase
      destination_id,
      amount,
      // eslint-disable-next-line camelcase
      balance_left,
      notes
    };
    const result = await modDeal.createDeal(data);
    helpers.response(res, result, 200, null, 'Transaction succes');
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

module.exports = {
  createDeal,
  findDeal,
  updateDeal,
  deleteDeal,
  detailDeal
};
