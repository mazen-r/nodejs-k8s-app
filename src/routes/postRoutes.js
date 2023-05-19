const express = require("express");

const controller = require("../controllers/postController");
const userAuth = require('../middleware/auth')
const cache = require('../middleware/cache')
const validation = require('../middleware/validation');

const router = express.Router();

router.post("/create", userAuth, validation.createPostValidator ,controller.createPost);
router.put("/update/:postId?", userAuth, validation.updatePostValidator ,controller.updatePost);
router.get("/page/:page", cache, controller.getPosts);
router.get("/:postId?", controller.getPost);
router.delete("/delete/:postId?", userAuth, controller.deletePost);

module.exports = router;