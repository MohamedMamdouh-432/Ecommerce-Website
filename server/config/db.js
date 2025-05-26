const mongoose = require('mongoose');
const { logger } = require('../utils/utils');
const Env = require('./env');

const connectDB = async () => {
    try {
        await mongoose.connect(Env.DB_URL);
        logger.success('🔥 Database connected successfully 🔥');
    } catch (error) {
        logger.error('DB connection error: ', error);
        process.exit(1);
    }
};

module.exports = connectDB;
