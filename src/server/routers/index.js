const createError = require('http-errors');
const path = require('path');

const controller = require('../controllers/index');

exports.init = app => {

    // REST API
    app.use('/api', require('./api'));

    // MVC
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
    });

    // Catch 404 and forward to error handler
    app.use((req, res, next) => next(createError(404)));

    // Error handler
    app.use(controller.error);
};
