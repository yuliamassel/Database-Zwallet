const createError = require('http-errors');
const Joi = require('joi');
// const helpers = require('../helper/help');

const myConsole = (req, res, next) => {
  console.log('ini middleware');
  next();
};

const callUsers = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    next(createError(403, 'e-mail cant be empty'));
  } else if (!password) {
    next(createError(403, 'oi password cant be empty'));
  }
  next();
};

const forUpdate = (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const id = req.params.id;
  const schema = Joi.object({
    id: Joi.number().required()
  });

  const { error } = schema.validate(req.params);
  if (error) {
    const errorMessage = error.details.map((errObject) => errObject.message).toString();
    // res.status(422);
    // res.json({ error: errorMessage });
    return next(createError(422, errorMessage));
  };
  next();
};

module.exports = {
  myConsole,
  callUsers,
  forUpdate
};
