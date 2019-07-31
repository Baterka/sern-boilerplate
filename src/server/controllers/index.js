const log = require('../utils/log');

const { errors: language } = require('../data/localization/cs/server');

exports.error = (err, req, res, next) => {
  if (!res.locals.baseURL) {
    res.locals = {
      ...res.locals,
      baseURL: global.config.website.url,
    };
  }

  const status = err.status || 500;

  if (status >= 500) {
    log.error(err);
  }

  res.locals.error = {
    status,
    title: language[status] ? language[status].title : err.message,
    message: language[status] ? language[status].message : '',
    error: process.env.NODE_ENV === 'development' ? err : {},
  };

  // Render the error page
  res.status(status);
  res.render('error', {
    layout: false
  });
};
