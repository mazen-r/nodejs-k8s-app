const { ValidateSignature } = require('../utils/tokens');

const userAuth = async (req, res, next) => {
    try {
        const isAuthorized = await ValidateSignature(req)
        if (isAuthorized) {
            return next();
        } else {
            return res.status(403).json({message: "You are not authorized"})
        };
    } catch (err) {
        return res.status(403).json({message: "You are not authorized"})
    }
};

module.exports = userAuth;