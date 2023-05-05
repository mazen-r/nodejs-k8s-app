const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT
const APP_SECRET = process.env.APP_SECRET
const TWILIO_SID = process.env.TWILIO_SID
const TWILIO_AUTH = process.env.TWILIO_AUTH
const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT

module.exports = {
    PORT: PORT,
    APP_SECRET: APP_SECRET,
    TWILIO_SID: TWILIO_SID,
    TWILIO_AUTH: TWILIO_AUTH,
    TWILIO_SERVICE_SID: TWILIO_SERVICE_SID,
    REDIS_HOST: REDIS_HOST,
    REDIS_PORT: REDIS_PORT
}