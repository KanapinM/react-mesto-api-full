require('dotenv').config();

const { JWT_SECRET = '36a68e72cdbf3047f461711d31dc3d817057d00060ea467e25808f5d4f474d7b' } = process.env;
// eslint-disable-next-line max-len
// const { JWT_SECRET = '3249fd8a9a9b728c91370877b91d437f726d199291890896dd5e838f6794f31d' } = process.env;

const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const auth = (req, res, next) => {
  const JWT = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(JWT, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация.'));
  }

  req.user = payload;

  return next();
};
module.exports = auth;
