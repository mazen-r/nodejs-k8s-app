const express = require("express");

const controller = require("../controllers/userController");
const userAuth = require('../middleware/auth');
const validation = require('../middleware/validation');

const router = express.Router();

router.post("/register", validation.registrationValidator, controller.registerUser);
router.post("/login", validation.loginValidator ,controller.loginUser);
router.get("/profile", userAuth, controller.profile);
router.delete("/delete", userAuth, controller.deleteUser);
router.get("/otp", userAuth, validation.otpValidator ,controller.userOTP);
router.post("/verify", userAuth, validation.verifyOtpValidator ,controller.verifyOTP);

module.exports = router;