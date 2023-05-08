const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT
const APP_SECRET = process.env.APP_SECRET
const TWILIO_SID = process.env.TWILIO_SID
const TWILIO_AUTH = process.env.TWILIO_AUTH
const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID
const REDIS_PORT = process.env.REDIS_PORT
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

module.exports = {
    PORT: PORT,
    APP_SECRET: APP_SECRET,
    TWILIO_SID: TWILIO_SID,
    TWILIO_AUTH: TWILIO_AUTH,
    TWILIO_SERVICE_SID: TWILIO_SERVICE_SID,
    REDIS_PORT: REDIS_PORT,
    DB_HOST: DB_HOST,
    DB_NAME: DB_NAME,
    DB_USER: DB_USER,
    DB_PASSWORD: DB_PASSWORD
}