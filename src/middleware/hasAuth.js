/* Importing the responseHandler.js file from the utils folder. */
const Response = require("../utils/responseHandler");

/* THIS MIDDLEWARE IS TO VERIFY IF USER IS LOGGED IN OR NOT */
exports.hasAuth = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        return Response.send(
            res.status(401),
            'error',
            "Please login to continue"
        );
    }
}