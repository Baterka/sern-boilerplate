const http = require('http');
const log = require('./log');
const config = require('../config');

const bind = port => typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

/**
 * Event listener for HTTP server "error" event.
 */

const onError = err => {
  if (err.syscall !== 'listen') {
    throw error;
  }

  let bind = bind(port);

  switch (err.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = server => {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

  log.info('Listening on ' + bind);
  log.info('Running in ' + process.env.NODE_ENV + ' mode.');
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
   * Listen for events
   */

  server.on('error', onError);
  server.on('listening', () => onListening(server));

  return server;
};
