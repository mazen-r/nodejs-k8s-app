const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT
const APP_SECRET = process.env.APP_SECRET
const TWILIO_SID = process.env.TWILIO_SID
const TWILIO_AUTH = process.env.TWILIO_AUTH
const TWILIO_NUMBER = process.env.TWILIO_NUMBER
const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID

module.exports = {
    PORT: PORT,
    APP_SECRET: APP_SECRET,
    TWILIO_SID: TWILIO_SID,
    TWILIO_AUTH: TWILIO_AUTH,
    TWILIO_NUMBER: TWILIO_NUMBER,
    TWILIO_SERVICE_SID: TWILIO_SERVICE_SID
}