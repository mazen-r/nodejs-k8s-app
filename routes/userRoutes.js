const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");



router.get("/user/:id?", controller.getUser);
router.post("/create", controller.createUser);
router.get("/:id?", controller.getUsers);

module.exports = router;