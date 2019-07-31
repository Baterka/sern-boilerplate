const createError = require('http-errors');

const controller = require('../controllers/index');

exports.init = app => {

  // REST API
  app.use('/api', require('./api'));

  // MVC
  // Not used in SPA

  // TODO: Error handler

  // Catch 404 and forward to error handler
  app.use((req, res, next) => next(createError(404)));

  // Error handler
  app.use(controller.error);
};
