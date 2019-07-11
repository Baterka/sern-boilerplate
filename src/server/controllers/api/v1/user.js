const os = require("os");

exports.layout = async (req, res, next) => {
    // For some data same in all router of this endpoint
    next();
};

exports.index = async (req, res) => {
    res.jsend.success({
        username: os.userInfo().username
    });
};