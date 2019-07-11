const express = require("express");

const router = express.Router();
const controller = require("../../../controllers/api/v1");

router.use("/user", require("./user"));
router.get("/", controller.index);

module.exports = router;