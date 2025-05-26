const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });
const { logger } = require('./utils/utils');
const app = require('./app');
const Env = require('./config/env');

mongoose.connect(Env.DB_URL).then((res) => {
    logger.success(`🔥 Database connected successfully 🔥: ${res.connection.name}`);
}).catch((err) => {
    logger.error('Data Base connection error: ', err.message);
    process.exit(1);
});

const server = app.listen(Env.PORT, () => {
    logger.normal(`Server running on http://localhost:${Env.PORT}${Env.API_BASE_URL}`);
});

process.on('uncaughtException', (err) => {
    logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...')
    logger.error(err.name, err.message)
    process.exit(1)
})

process.on('unhandledRejection', (err) => {
    logger.error('UNHANDLED REJECTION! 💥 Shutting down...')
    logger.error(err.name, err.message)
    server.close(() => process.exit(1))
})