const express = require('express');
const morgan = require('morgan');
const Env = require('./config/env');
const Routes = require('./routes/routes');
const { errorHandler } = require('./utils/utils');

const app = express();
app.use(express.json());

if (Env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(`${Env.API_BASE_URL}/categories`, Routes.CategoryRoute);
app.use(`${Env.API_BASE_URL}/sub-categories`, Routes.SubCategoryRoute);
app.use(`${Env.API_BASE_URL}/brands`, Routes.BrandRoute);

app.use(errorHandler);
// app.use('/*', (req, res, next) => next(new ApiError(`Can't find ${req.originalUrl}!`, 404)));

module.exports = app;
