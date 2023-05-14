const { registrationSchema, loginSchema, otpSchema, verifyOtpSchema, createPostSchema, updatePostSchema,
     createCommentSchema, updateCommentSchema } = require('../utils/validator');

const validator = async (schema, req, res, next) => {
    try {
        schema.parse(req.body);
    } catch (err) {
        const errors = {};
        JSON.parse(err.message).forEach((e) => {
          errors[e.path[0]] = e.message;
        });
        return res.status(400).json( errors);
    }
    next();
};

const registrationValidator = async (req, res, next) => {
    await validator(registrationSchema, req, res, next);
};

const loginValidator = async (req, res, next) => {
    await validator(loginSchema, req, res, next);
};

const otpValidator = async (req, res, next) => {
    await validator(otpSchema, req, res, next);
};

const verifyOtpValidator = async (req, res, next) => {
    await validator(verifyOtpSchema, req, res, next);
};

const createPostValidator = async (req, res, next) => {
    await validator(createPostSchema, req, res, next);
};

const updatePostValidator = async (req, res, next) => {
    await validator(updatePostSchema, req, res, next);
};

const createCommentValidator = async (req, res, next) => {
    await validator(createCommentSchema, req, res, next);
};

const updateCommentValidator = async (req, res, next) => {
    await validator(updateCommentSchema, req, res, next);
};

module.exports = { registrationValidator, loginValidator, otpValidator, verifyOtpValidator, createPostValidator, updatePostValidator, createCommentValidator, updateCommentValidator };