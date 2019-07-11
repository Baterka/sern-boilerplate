const express = require("express");
const passport = require("passport");

const router = express.Router();
const controller = require("../../../controllers/api/v1");

router.use("/user", require("./user"));
router.use("/tournament",require("./tournament"));
router.use("/friend",require("./friend"));
router.get("/", controller.index);

module.exports = router;