require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { signInValidation, signUpValidation } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
// const env = 'mongodb://localhost:27017/mestodb';
const env = 'mongodb://127.0.0.1/mestodb1';

const allowedCors = [
  'https://mkmesto.nomoredomains.work',
  'http://mkmesto.nomoredomains.work',
  'localhost:3000',
];

const app = express();

// eslint-disable-next-line prefer-arrow-callback
app.use(function (req, res, next) {
  const { method } = req; // Сохраняем источник запроса в переменную origin
  const { origin } = req.headers;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  // проверяем, что источник запроса есть среди разрешённых
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);
app.use(helmet());

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(env);
app.use(cookieParser());
app.use(requestLogger);

app.post('/signin', signInValidation(), login);
app.post('/signup', signUpValidation(), createUser);
app.use(auth);
app.use('/cards', cards);
app.use('/users', users);
app.use((req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next(err);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
