const express = require("express");

const router = express.Router();

router.use("/v1", require("./v1"));

/**
 * Catch 404 and forward (API)
 */
router.use((req, res, next) => {
    next(res.createError(404));
});

/**
 * Custom error handler (API
 */
router.use((err, req, res, next) => {
    const development = process.env.NODE_ENV === "development";
    const code = err.status || 500;
    res.status(code).jsend.error({
        code,
        message: err.message,
        data: (development ? {stack: err.stack} : undefined)
    });
});

module.exports = router;