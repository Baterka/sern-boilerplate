/**
 * @author David Bubeník (davidbubenik.cz)
 */
const createError = require("http-errors");

const controller = require("../controllers/index");

exports.init = app => {

    // Headers
    app.use(controller.headers);

    // Logout history (back) fix
    app.use((req, res, next) => {
        res.set("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
        next();
    });

    // REST API
    app.use("/api", require("./api"));

    // MVC
    app.use("/user", require("./user"));
    app.use("/tournament", require("./tournament"));
    app.use("/", require("./root"));

    // Catch 404 and forward to error handler
    app.use((req, res, next) => next(createError(404)));

    // Error handler
    app.use(controller.error);
};