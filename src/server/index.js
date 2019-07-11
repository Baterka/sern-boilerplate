const express = require("express");
const cookieParser = require("cookie-parser");
const jsend = require("jsend");

// Environment
process.env.NODE_ENV = (process.env.NODE_ENV ? process.env.NODE_ENV : "development");

// Config
global.config = require("./config");

const http = require("./utils/http");
const db = require("./models");
const log = require("./utils/log");

(async () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());

    // Static files (and React App)
    app.use(express.static('dist'));

    // JSend specification
    app.use(jsend.middleware);

    // Initialize database
    try {
        await db.sequelize.sync();
    } catch (err) {
        log.error(`Error while connecting to database: ${err.message}`);
        process.exit();
    }

    // Router
    await require("./routers").init(app);

    // Side events
    await require("./utils/sideEvents").init();

    // Launch server
    await http.launch(app);
})();
