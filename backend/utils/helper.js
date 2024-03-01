const sendError = async (res, error, status=401) => {
    res
        .status(status)
        .json({
            success: false,
            error
        });
}

module.exports = {
    sendError
}