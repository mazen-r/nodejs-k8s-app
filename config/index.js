const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT
const APP_SECRET = process.env.APP_SECRET

module.exports = {
    PORT: PORT,
    APP_SECRET: APP_SECRET
}