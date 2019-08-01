const http = require('http');
const log = require('./log');
const config = require('../config');

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port))
    return val;

  if (port >= 0)
    return port;

  return false;
};

exports.launch = async (app) => {

  let port = normalizePort(config.website.port);
  app.set('port', port);

  /**
   * Create HTTP server.
   */

  let server = http.createServer(app);

  /**
   * Listen on provided port
   */

  server.listen(port);

  /**
   * Event listener for HTTP server "error" event.
   */

  server.on('error', err => {
    if (err.syscall !== 'listen')
      throw err;

    switch (err.code) {
      case 'EACCES':
        log.error('Port ' + port + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        log.error('Port ' + port + ' is already in use');
        process.exit(1);
        break;
      default:
        throw err;
    }
  });

  /**
   * Event listener for HTTP server "listening" event.
   */

  server.on('listening', () => {
      let addr = server.address();

      log.info('Listening on port ' + addr.port);
      log.info('Running in ' + process.env.NODE_ENV + ' mode.');
  });

  return server;
};
