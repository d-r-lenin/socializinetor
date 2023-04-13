
module.exports = {
    addErrorHandler (req, res, next) {
        res.sendError = (err) => {
            const errorCode = parseInt(err.message.split('$')[1]);
            res.status(errorCode || 500).json({
                message: err.message.split('$')[0] || err.message
            });
        };
        next();
    }
};
