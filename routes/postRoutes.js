const express = require("express");

const controller = require("../controllers/postController");
const userAuth = require('../middleware/auth')

const router = express.Router();

router.post("/create", userAuth, controller.createPost);
router.post("/update/:postId?", userAuth, controller.updatePost);
router.get("/page/:page?", controller.getPosts);
router.get("/:postId?", controller.getPost);

module.exports = router;