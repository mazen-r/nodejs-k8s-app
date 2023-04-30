const express = require("express");

const controller = require("../controllers/userController");
const userAuth = require('../middleware/auth')

const router = express.Router();

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);
router.get("/profile", userAuth, controller.profile);
router.delete("/delete", userAuth, controller.deleteUser);

module.exports = router;