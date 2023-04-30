const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const GenerateSalt = async () => {
    return await bcrypt.genSalt()
};

const GeneratePassword = async (uhashedPassword, salt) => {
    return await bcrypt.hash(uhashedPassword, salt)
};

module.exports = { GenerateSalt, GeneratePassword }