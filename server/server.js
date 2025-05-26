require('dotenv').config({path: './config/.env'});
const app = require('./app');
const Env = require('./config/env');
const connectDB = require('./config/db');
const {logger} = require('./utils/utils');

connectDB().then(() => {
    app.listen(Env.PORT, () => {
        logger.success(`Server running on http://localhost:${Env.PORT}/${Env.API_BASE_URL}`);
    });
});
