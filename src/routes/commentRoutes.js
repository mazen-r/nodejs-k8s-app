const express = require("express");

const controller = require("../controllers/commentController");
const userAuth = require('../middleware/auth')
const userVerify = require('../middleware/verification')
const cache = require('../middleware/cache')

const router = express.Router();

router.post("/create", userAuth, userVerify, controller.createComment);
router.get("/post/:postId?", cache, controller.getComments);
router.put("/update/:commentId?", userAuth, controller.updateComment);
router.delete("/delete/:commentId?", userAuth, controller.deleteComment);

module.exports = router;