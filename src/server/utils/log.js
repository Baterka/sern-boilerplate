/**
 * @author David Bubeník
 * Description: Custom command line logger with message levels
 */

// WebStorm Console colors fix
process.stdout.isTTY = true;

const colors = require("colors");

const config = require("../config");

let prefix = "";

colors.setTheme({
    info: "green",
    warn: "yellow",
    debug: "cyan",
    error: "red"
});

function time() {
    return "[" + new Date().toLocaleString() + "] ";
}

module.exports = {
    info(msg) {
        console.log(time() + colors.info(prefix + "[INFO] " + msg));
    },
    warn(msg) {
        console.log(time() + colors.warn(prefix + "[WARN] " + msg));
    },
    debug(msg) {
        if (global.config.debug)
            console.log(time() + colors.debug(prefix + "[DEBUG] " + msg));
    },
    error(msg, err = false) {
        if (msg instanceof Object)
            console.log(time() + colors.error(prefix + "[ERROR] " + msg.stack));
        else if (err) {
            console.log(time() + colors.error(prefix + "[ERROR] " + msg));
            console.log(time() + colors.error(prefix + "[ERROR] " + err.stack));
        } else
            console.log(time() + colors.error(prefix + "[ERROR] " + msg));
    }
};