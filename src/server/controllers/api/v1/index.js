/**
 * API root
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.index = async (req, res) => {
    res.jsend.success({
        message: 'API root',
        version: 1
    });
};
