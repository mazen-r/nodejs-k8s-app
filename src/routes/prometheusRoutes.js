const express = require("express");

const controller = require("../controllers/prometheusController");

const router = express.Router();

router.get("/metrics", controller.metrics);

module.exports = router;