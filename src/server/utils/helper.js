/**
 * @author David Bubeník
 * Description: Helper functions for whole system
 */

const createError = require("http-errors");
const axios = require("axios");
const fs = require("fs-extra");
const childProcess = require("child_process");

const log = require("./log");


/**
 * Promise delay
 * @type {function(*=): Promise<any>}
 */
exports.delay = global.gDelay = duration => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duration)
    });
};

/**
 * Get last commit
 * @returns {Promise<void>}
 */
exports.getGitLastCommit = async () => {
    return new Promise((resolve, reject) => {
        childProcess.exec("git rev-parse HEAD", function (err, stdout) {
            if (err)
                reject();
            resolve(stdout);
        });
    });
};

exports.getAppVersion =async ()=>{
    return (await fs.readJson("./package.json")).version;
};

exports.isset = variable => {
    return typeof variable !== "undefined";
};

/**
 * Random generators
 * @type {{alphanumeric: (function(*): string)}}
 */
exports.random = {
    alphanumeric: length => {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";
        for (let i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
};

/**
 * Custom middleware what encapsulating createError to hide error messages in production.
 */
exports.createErrorMiddleware = (req, res, next) => {
    res.createError = (...arguments) => {
        let err;
        let msg;
        let status = 500;
        let props = {};

        for (let i = 0; i < arguments.length; i++) {
            let arg = arguments[i];
            if (arg instanceof Error) {
                err = arg;
                status = err.status || err.statusCode || status;
                continue
            }
            switch (typeof arg) {
                case "string":
                    msg = arg;
                    break;
                case "number":
                    status = arg;
                    break;
                case "object":
                    props = arg;
                    break
            }
        }

        if (status >= 500)
            log.error(err);

        return createError(status, process.env.NODE_ENV === "development" ? (err || msg) : undefined, props);
    };
    next();
};

/**
 * Validation helper functions
 */
exports.validator = {
    buildAjv: (Ajv, additionalParams) => {
        const ajv = new Ajv({
            allErrors: true,
            jsonPointers: true,
            coerceTypes: true,
            useDefaults: true,
            $data: true,
            ...additionalParams
        });
        require("ajv-keywords")(ajv);
        require("ajv-errors")(ajv);
        require("ajv-sanitizer")(ajv);
        ajv.addKeyword("isNotEmpty", {
            type: "string",
            validate: function (schema, data) {
                return typeof data === "string" && data.trim() !== ""
            },
            errors: false
        });
        return ajv;
    },
    validate: (ajv, schema, data) => {
        const errors = {};
        if (!ajv.validate(schema, data)) {
            for (let e of ajv.errors) {
                let params = e.params.errors;

                if (e.dataPath === "") {
                    for (let param of params) {
                        if (param.keyword === "required")
                            errors[param.params.missingProperty] = e.message;
                        else {
                            let last = param.dataPath.lastIndexOf("/");
                            let title = param.dataPath.substring(1, (last > 0 ? last : undefined));
                            errors[title !== "" ? title : "general"] = e.message;
                        }
                    }
                } else
                    errors[e.dataPath.substr(1)] = e.message;
            }
        }
        return errors;
    }
};