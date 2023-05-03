const express = require("express");

const controller = require("../controllers/commentController");
const userAuth = require('../middleware/auth')
const userVerify = require('../middleware/verification')

const router = express.Router();

router.post("/create", userAuth, userVerify, controller.createComment);
router.get("/post/:postId?", userAuth, userVerify, controller.getComments);

module.exports = router;