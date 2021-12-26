
const modUsers = require('../models/modUser');
const { v4: uuidv4 } = require('uuid');
const helpers = require('../helper/help');
const createError = require('http-errors');
const bcrypt = require('bcrypt');

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.username || '';
    const sort = req.query.sort || 'create_at';
    const updated = req.query.updated || 'asc';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const offset = (page - 1) * limit;
    // console.log(search);

    const result = await modUsers.getUsers({
      search: search,
      sort: sort,
      updated: updated,
      limit: limit,
      offset: offset
    });
    const resultCount = await modUsers.usersCount();
    const { total } = resultCount[0];
    helpers.response(res, result, 200, {
      pageResult: page,
      limit: limit,
      totalData: total,
      totalPage: Math.ceil(total / limit)
    });
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError();
    next(err);
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
      result: result
    });
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError();
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password, addres, telephone } = req.body;

    const user = await modUsers.findData(email);

    if (user.length > 0) {
      return next(createError(403, 'email already exists'));
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const data = {
      id: uuidv4(),
      username,
      email,
      password: hashPassword,
      addres,
      telephone
    };

    const finalResult = await modUsers.insertData(data);
    helpers.response(res, finalResult, 200, 'great you come in');
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [user] = await modUsers.findData(email);
    console.log(user);
    if (!user) {
      return next(createError(403, 'please enter correct email'));
    }

    const resultHash = bcrypt.compare(password, user.password);

    if (resultHash) {
      helpers.response(res, null, 200, null, 'nice youve succesfully login');
    } else {
      next(createError(403, 'sorry you entered wrong password'));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, new createError.InternalServerError()));
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
      updated: new Date()
    };
    const result = await modUsers.updateUsers(data, id);
    res.json({
      result: result
    });
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError();
    next(err);
  }
};

const deleteUsers = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await modUsers.deleteUsers(id);
    res.json({
      result: result
    });
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError();
    next(err);
  }
};

const detailUsers = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await modUsers.detailUsers(id);
    res.json({
      result: result
    });
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError();
    next(err);
  }
};

module.exports = {
  postUsers,
  getUsers,
  updateUsers,
  deleteUsers,
  detailUsers,
  register,
  login
};
