const { TWILIO_SID, TWILIO_AUTH, TWILIO_NUMBER, TWILIO_SERVICE_SID } = require('../config');

const twilio = require('twilio');

const client = twilio(TWILIO_SID, TWILIO_AUTH);

const sendOTP = async (phoneNumber) => {
    await client.verify.v2.services(TWILIO_SERVICE_SID)
        .verifications
        .create({to: phoneNumber, channel: 'sms'})
};

const verifyCode = async (phoneNumber, verificationCode) => {
    const verificationStatus = await client.verify.v2.services(TWILIO_SERVICE_SID)
          .verificationChecks
          .create({to: phoneNumber, code: verificationCode});
    return verificationStatus.status

}

module.exports = { sendOTP, verifyCode }