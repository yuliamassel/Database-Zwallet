
const { v4: uuidv4 } = require('uuid');
const helpers = require('../helper/help');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const client = require('../configurasi/redis');
const modUsers = require('../models/modUser');
const modWallet = require('../models/modWalet');

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.username || '';
    const sort = req.query.sort || 'create_at';
    const updated = req.query.updated || 'asc';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
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
  console.log(req.body);
  try {
    const { username, email, password, addres } = req.body;
    // const fileName = req.file.filename;
    const hashPassword = await bcrypt.hash(password, 10);
    const data = {
      id: uuidv4(),
      username,
      email,
      password: hashPassword,
      // photo: `http://localhost:2002/file/${fileName}`,
      addres,
      updated: new Date()
    };
    const result = await modUsers.postUsers(data);
    helpers.response(res, result, 200, null, 'great you come in');
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
      telephone,
      verify: 'no'
    };

    const finalResult = await modUsers.insertData(data);
    const makeWallet = await modWallet.createData(data);
    helpers.sendEmail(email);
    helpers.response(res, finalResult, makeWallet, 200, 'great you come in');
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [user] = await modUsers.findData(email);
    // console.log(user);
    if (!user) {
      return next(createError(403, 'please enter correct email'));
    }

    const resultHash = await bcrypt.compare(password, user.password);

    if (!resultHash) return next(createError(403, 'sorry you entered wrong password'));
    const secretKey = process.env.SECRET_KEY_JWT;
    const payload = {
      email: user.email,
      username: user.username,
      role: user.role
    };
    const expireToken = { expiresIn: '1 days' };
    const token = jwt.sign(payload, secretKey, expireToken);
    user.token = token;
    helpers.response(res, user, 200, null, 'nice youve succesfully login');
  } catch (error) {
    console.log(error);
    next(createError(500, new createError.InternalServerError()));
  }
};

const profile = async (req, res, next) => {
  const email = req.email;
  console.log(req.email);
  try {
    const user = await modUsers.getUserByEmail(email);
    // console.log(user);
    helpers.response(res, user, 200, null, 'berhasil');
  } catch (error) {
    console.log(error);
    next(createError(500, new createError.InternalServerError()));
  }
};

const updateUsers = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { username, email, password, addres } = req.body;
    // const fileName = req.file.filename;
    const hashPassword = await bcrypt.hash(password, 10);
    const data = {
      username,
      email,
      // photo: `http://localhost:2002/file/${fileName}`,
      password: hashPassword,
      addres,
      updated: new Date()
    };
    const result = await modUsers.updateUsers(data, id);
    helpers.response(res, result, 200, 'update profile succes');
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
    helpers.response(res, result, 200, null, 'succes delete user');
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

    // await client.setEx(`users/${id}`, 60 * 60, JSON.stringify(result));
    helpers.response(res, result, 200, null, 'Data From Database');
  } catch (error) {
    console.log(error);
    const err = new createError.InternalServerError();
    next(err);
  }
};

const addPhoto = async (req, res, next) => {
  try {
    // const fileName = req.file.filename;
    const email = req.email;
    const photo = req.file.filename;
    const updatedAt = new Date();
    const data = {
      photo: `http://localhost:2002/file/${photo}`,
      create_at: updatedAt
    };
    const result = await modUsers.updatePhoto(data, email);
    helpers.resTransfer(res, data, 200, 'Succes Upload');
    // console.log(req.email);
    // console.log(req.file);
    console.log(result);
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: 'Internal Server Error!' });
  }
};

module.exports = {
  postUsers,
  getUsers,
  updateUsers,
  deleteUsers,
  detailUsers,
  register,
  login,
  profile,
  addPhoto
};
