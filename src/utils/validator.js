const z = require('zod');

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );

const registrationSchema = z.object({
    userName: z.string().min(3, "Username must be at least 3 characters long").max(50, "Username cannot be longer than 50 characters").nonempty("You must provide a user name"),
    email: z.string().email("Invalid email address").nonempty("You must provide an email address"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(50, "Password cannot be longer than 50 characters").nonempty("You must provide a password")
});

const loginSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("You must provide an email address"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(50, "Password cannot be longer than 50 characters").nonempty("You must provide a password")
});

const otpSchema = z.object({
    phoneNumber: z.string().regex(phoneRegex, 'Invalid number').nonempty("You must provide a phone number"),
});

const verifyOtpSchema = z.object({
    phoneNumber: z.string().regex(phoneRegex, 'Invalid number').nonempty("You must provide a phone number"),
    verificationCode: z.string().nonempty("You must provide a verification code")
});

const createPostSchema = z.object({
    title: z.string().min(3, "title must be at least 3 characters long").max(25, "title cannot be longer than 25 characters").nonempty("You must provide a title"),
    description: z.string().min(3, "description must be at least 3 characters long").max(50, "description cannot be longer than 50 characters").nonempty("You must provide a description")
});

const updatePostSchema = z.object({
    title: z.string().min(3, "title must be at least 3 characters long").max(25, "title cannot be longer than 25 characters"),
    description: z.string().min(3, "description must be at least 3 characters long").max(50, "description cannot be longer than 50 characters")
});

const createCommentSchema = z.object({
    postId: z.number(),
    description: z.string().min(3, "description must be at least 3 characters long").max(25, "description cannot be longer than 25 characters").nonempty("You must provide a comment description")
});

const updateCommentSchema = z.object({
    description: z.string().min(3, "description must be at least 3 characters long").max(25, "description cannot be longer than 25 characters")
});

module.exports = { registrationSchema, loginSchema, otpSchema, verifyOtpSchema, createPostSchema, updatePostSchema, createCommentSchema, updateCommentSchema };