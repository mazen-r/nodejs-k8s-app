const { User } = require('../database/models/relations');

const userVerify = async (req, res, next) => {
    const { userId } = req.user;
    try {
        const  { verified } = await User.findByPk(userId);
        if (verified) {
            return next();
        };
        return res.status(403).json({message: "Please verify your account first!"});
    } catch(err) {
        return res.status(403).json({message: "Please verify your account first!"});
    };
};

module.exports = userVerify;