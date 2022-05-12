/* It's a module that contains all the HTTP status codes. */
const statusCode = require('http-status-codes');

/* It's a class that sends a response to the client */
class Response {
    /**
     * It sends a JSON response to the client
     * @param res - The response object
     * @param status - The status of the request.
     * @param data - The data you want to send back to the client.
     * @param message - The message you want to send to the user.
     */
    static send(res, status, data, message) {
        res.json({
            status,
            message,
            data,
        })
    }
}

module.exports = Response