const connection = require("../configurasi/connectDB");
const modUsers = require("../models/modUser");
const helpers = require("../helper/help")
const createError = require('http-errors')


const getUsers = async (req, res, next) => {
  try {
    const search = req.query.username
    const sort = req.query.sort || 'created_at'
    const updated = req.query.updated || 'desc'
    // console.log(search);

    const result = await modUsers.getUsers({
      search,
      sort,
      updated
    })
    helpers.response(res,result,200)
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError()
    next(err)
  }
};

const postUsers = async (req, res, next) => {
  try {
    const { username, email, password, addres, telephone } = req.body;
    const data = {
      username,
      email,
      password,
      addres,
      telephone,
      updated: new Date()
    };
    const result = await modUsers.postUsers(data);
    res.json({
      result: result,
    });
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError()
    next(err)
  }
};



const updateUsers = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { username, email, password, addres, telephone } = req.body;
    const data = {
      username,
      email,
      password,
      addres,
      telephone,
      updated: new Date(),
    };
    const result = await modUsers.updateUsers(data, id);
    res.json({
      result: result,
    });
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError()
    next(err)
  }
};

const deleteUsers = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await modUsers.deleteUsers(id);
    res.json({
      result: result,
    });
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError()
    next(err)
  }
};

const detailUsers = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await modUsers.detailUsers(id);
    res.json({
      result: result,
    });
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError()
    next(err)
  }
};

module.exports = {
  postUsers,
  getUsers,
  updateUsers,
  deleteUsers,
  detailUsers,
};
