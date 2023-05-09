const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { APP_SECRET } = require('../config');

const GenerateSalt = async () => {
    return await bcrypt.genSalt()
};

const GeneratePassword = async (uhashedPassword, salt) => {
    return await bcrypt.hash(uhashedPassword, salt)
};

const ValidatePassword = async (uhashedPassword, savedPassword, salt) => {
    return await GeneratePassword(uhashedPassword, salt) === savedPassword
};

const GenerateSignature = async (payload) => {
    return await jwt.sign(payload, APP_SECRET, {expiresIn: '1d'})
}

const ValidateSignature = async (req) => {
    const signature = req.get('Authorization')
    if (signature) {
        const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET)
        req.user = payload
        return true        
    } else {
        return false
    };
};

module.exports = { GenerateSalt, GeneratePassword, ValidatePassword, GenerateSignature, ValidateSignature }