const log = require('../utils/log');

exports.error = (err, req, res, next) => {
    const status = err.status || 500;

    if (status >= 500)
        log.error(err);

    const devError = `
      <h1>${status}</h1>
      <h4>Message:</h4>
      <p>${err.message}</p>
      <h4>Stack:</h4>
      <p>${err.stack}</p>`;

    // Render the error page
    res.status(status).send(process.env.NODE_ENV === 'development' ? devError : '');
};
