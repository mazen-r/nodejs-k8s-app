const express = require("express");

const controller = require("../controllers/postController");
const userAuth = require('../middleware/auth')

const router = express.Router();

router.post("/create", userAuth, controller.createPost);
router.get("/:page?", controller.getPosts);

module.exports = router;