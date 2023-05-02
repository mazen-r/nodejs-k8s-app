const { TWILIO_SID, TWILIO_AUTH, TWILIO_NUMBER } = require('../config');

const twilio = require('twilio');

const client = twilio(TWILIO_SID, TWILIO_AUTH);
const verificationCode = Math.floor(100000 + Math.random() * 900000);

const sendOTP = async (phoneNumber) => {
    client.messages.create({
        body: `Your verification code is ${verificationCode}`,
        to: phoneNumber,
        from: TWILIO_NUMBER,
    });
};

module.exports = { sendOTP }