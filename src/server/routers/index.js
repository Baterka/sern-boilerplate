exports.init = app => {

    // REST API
    app.use("/api", require("./api"));

    // MVC
    // Not used in SPA

    // TODO: Error handler
};