/* Importing the responseHandler.js file from the utils folder. */
const Response = require("../utils/responseHandler");
require('dotenv').config();

/* THIS MIDDLEWARE IS TO VERIFY IF USER IS LOGGED IN OR NOT */
// exports.hasAuth = function(req, res, next) {
//     if (req.user) {
//         next();
//     } else {
//         return Response.send(
//             res.status(401),
//             'error',
//             "Please login to continue"
//         );
//     }
// }

const jwt = require('jsonwebtoken');

exports.hasAuth = (req, res, next) => {
    const { user_id } = req.body;
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(401).json({
            status: 'error',
            error: "Oops an AUthorization Token is Required",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.user_id;
        if (user_id !== userId) {
            return res.status(401).json({
                status: 'error',
                error: "Please Login to Continue",
            });
        } else {
            return next();
        }
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            error: err || "Oops an Error Occured on our Server. Please Try again Later",
        });
    }
};