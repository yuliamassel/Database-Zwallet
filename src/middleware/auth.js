const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const veryfied = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log(token);
  } else {
    return next(createError(403, 'Server Need Token'));
  };
  try {
    const secretKey = process.env.SECRET_KEY_JWT;
    const decoded = jwt.verify(token, secretKey);
    req.email = decoded.email;
    req.role = decoded.role;
    next();
  } catch (error) {
    if (error && error.name === 'JsonWebTokenError') {
      return next(createError(400, 'Your Token Not Valid'));
    } else if (error && error.name === 'TokenExpiredError') {
      return next(createError(400, 'Token Expired'));
    } else {
      return next(createError(403, 'Token Not Active'));
    }
  }
};
const isAdmin = (req, res, next) => {
  const role = req.role;
  if (role !== 'admin') return next(createError(403, 'Access Denied!'));
  next();
};

module.exports = {
  veryfied,
  isAdmin
};
