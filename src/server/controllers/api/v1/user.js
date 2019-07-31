const os = require('os');

exports.layout = async (req, res, next) => {
    // For some data same in all router of this endpoint
    next();
};

exports.index = async (req, res) => {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            res.jsend.success({
                username: os.userInfo().username
            })
        } else {
            res.jsend.fail({
                message: 'Try again later'
            })
        }
    }, 1000); // Fake response time
};
