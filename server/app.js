const express = require('express');
const morgan = require('morgan');
const Env = require('./config/env');
const Routes = require('./routes/routes');

const app = express();
app.use(express.json());

if (Env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(`${Env.API_BASE_URL}/categories`, Routes.CategoryRoute);

module.exports = app;
