/**
 * @author David Bubeník
 * Description: Helper functions for whole system
 */

const createError = require('http-errors');
const log = require('./log');


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
        continue;
      }
      switch (typeof arg) {
        case 'string':
          msg = arg;
          break;
        case 'number':
          status = arg;
          break;
        case 'object':
          props = arg;
          break;
      }
    }

    if (status >= 500)
      log.error(err);

    return createError(status, process.env.NODE_ENV === 'development' ? (err || msg) : undefined, props);
  };
  next();
};
