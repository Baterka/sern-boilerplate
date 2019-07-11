const os = require("os");

exports.layout = async (req, res, next) => {
    // For some data same in all router of this endpoint
    next();
};

exports.index = async (req, res) => {
    setTimeout(() => {
        res.jsend.success({
            username: os.userInfo().username
        })
    }, 1000); // Fake response time
};