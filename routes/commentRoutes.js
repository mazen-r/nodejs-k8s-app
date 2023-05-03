const express = require("express");

const controller = require("../controllers/commentController");
const userAuth = require('../middleware/auth')
const userVerify = require('../middleware/verification')

const router = express.Router();

router.post("/create", userAuth, userVerify, controller.createComment);
router.get("/post/:postId?", controller.getComments);
router.post("/update/:commentId?", userAuth, controller.updateComment);
router.delete("/delete/:commentId?", userAuth, controller.deleteComment);

module.exports = router;