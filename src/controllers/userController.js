const  { User } = require("../database/models/relations");
const { GenerateSalt, GeneratePassword, ValidatePassword, GenerateSignature } = require('../utils/tokens');
const { sendOTP, verifyCode } = require('../utils/twilio');

const registerUser = async (req, res, next) => {
    const { userName, email, password: uhashedPassword } = req.body;
    const user = await User.findOne({ where: {email: email}});
    if (user) {
        return res.status(400).json({message: "This email has been registered"});
    }
    try {
        const salt = await GenerateSalt();
        const password = await GeneratePassword(uhashedPassword, salt);
        const userData = await User.create({ userName, email, password, salt });
        const { verified, userId } = userData;
        res.status(200).json({
            message: "Created user successfully",
            data: { userId, userName, email, verified }
        });
    } catch (err) {
        next(err)
    };
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email }});
    try {
        if (user) {
            const validPassword = await ValidatePassword(password, user.password, user.salt);
            if (validPassword) {
                const token = await GenerateSignature({ email: user.email, userId: user.userId, userName: user.userName});
                return res.status(200).json({token});
            };
        };
        return res.status(400).json({message: "Invalid data!"});
    } catch (err) {
        next(err);
    };
};

const profile = async (req, res, next) => {
    const { userId } = req.user;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            const { userName, verified, email } = user;
            return res.status(200).json({ data: { userId, userName, email, verified }});
        }
        return res.status(404).json({message: "There is no such user"});
    } catch (err) {
        next(err);
    };
};

const deleteUser = async (req, res, next) => {
    const { userId } = req.user;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.destroy();
            return res.status(200).json({message: "Deleted user successfully"});
        }
        return res.status(404).json({message: "There is no such user"});
    } catch(err) {
        next(err);
    };
};

const userOTP = async (req, res) => {
    const { userId } = req.user;    
    const { phoneNumber } = req.body;
    const user = await User.findByPk(userId);
    if (user.verified) {
        return res.status(200).json({message: "You are already verified!"});
    }    
    try {
        await sendOTP(phoneNumber);
        return res.status(200).json({message: "Verification code sent!"});
    } catch(err) {
        return res.status(400).json({message: "Phone number isn't correct!"});
    };
};

const verifyOTP = async (req, res) => {
    const { userId } = req.user;
    const { phoneNumber, verificationCode } = req.body;
    if (!phoneNumber | !verificationCode) {
        return res.status(400).json({message: "You must provide your phone number and verification code!"});
    }
    try {
        const verificationStatus = await verifyCode(phoneNumber, verificationCode);
        if (verificationStatus === 'approved') {
            await User.update({ verified: true }, { where: {userId: userId}});
            return res.status(200).json({message: "Account verified successfully!"});
        };
    } catch(err) {
        return res.status(400).json({message: "Verification code isn't correct!"});
    };
};

module.exports = { profile, registerUser, loginUser, deleteUser, userOTP, verifyOTP };