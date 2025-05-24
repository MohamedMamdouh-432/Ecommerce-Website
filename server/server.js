require('dotenv').config({path: './config/.env'});
const app = require('./app');
const Env = require('./config/env');
const connectDB = require('./config/db');

connectDB().then(() => {
    app.listen(Env.PORT, () => {
        console.log(`Server running on http://localhost:${Env.PORT}/${Env.API_BASE_URL}`);
    });
});
