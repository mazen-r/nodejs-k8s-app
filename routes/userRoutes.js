const express = require("express");

const controller = require("../controllers/userController");
const userAuth = require('../middleware/auth')

const router = express.Router();

router.get("/user/:id?", controller.getUser);
router.post("/create", controller.createUser);
router.post("/login", controller.loginUser);
router.delete("/delete", userAuth, controller.deleteUser);
router.get("/:id?", controller.getUsers);

module.exports = router;