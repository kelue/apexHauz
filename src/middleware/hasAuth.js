const Response = require("../utils/responseHandler");

/* THIS MIDDLEWARE IS TO VERIFY IF USER IS LOGGED IN OR NOT */
exports.hasAuth = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        return Response.send(
            res,
            200,
            "Please login to continue"
        );
    }
}