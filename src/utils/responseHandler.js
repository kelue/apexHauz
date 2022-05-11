const statusCode = require('http-status-codes');

class Response {
    static send(res, status, data, message) {
        res.json({
            status,
            message,
            data,
        })
    }
}

module.exports = Response