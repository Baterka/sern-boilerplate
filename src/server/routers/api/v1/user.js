const express = require('express');

const router = express.Router();
const controller = require('../../../controllers/api/v1/user');

// Data for layout
router.use(controller.layout);

router.get('/', controller.index);

module.exports = router;
