const { Router } = require("express");
const express = require("express");
const router = express.Router();
const { getAllMoves } = require("../controllers/index");

router.route("/").get(getAllMoves);

module.exports = router;
