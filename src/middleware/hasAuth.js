/* Loading the environment variables from the .env file. */
require('dotenv').config();

/* Importing the jsonwebtoken module. */
const jwt = require('jsonwebtoken');


const db = require('../config/db.config');

const { findUserById: findUserByIdQuery } = require('../database/queries/users');

/* A middleware function that checks if the user is authenticated. */
exports.hasAuth = (req, res, next) => {

    /* Destructuring the user_id from the request body. */
    const { user_id } = req.body;

    if (!(Number(user_id))) {
        return res.status(401).json({
            status: 'error',
            error: "user_id is required in request body",
        });
    } else {

        db.query(findUserByIdQuery, [
            user_id
        ], function(err, result) {
            if (result.length > 0) {
                /* Checking if the token is in the request body, query or headers. */
                const token =
                    req.body.token || req.query.token || req.headers["x-access-token"];

                /* Checking if the token is in the request body, query or headers. */
                if (!token) {
                    return res.status(401).json({
                        status: 'error',
                        error: "Oops an AUthorization Token is Required",
                    });
                } else {
                    /* Checking if the user is authenticated. */
                    try {
                        /* Verifying the token and returning the decoded token. */
                        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

                        /* Getting the user_id from the decoded token. */
                        const userId = decoded.user_id;

                        /* Checking if the user_id in the request body is the same as the user_id in the token. If
                        it is not, it returns an error message. If it is, it calls the next middleware function. */
                        if (user_id !== userId) {
                            return res.status(401).json({
                                status: 'error',
                                error: "Please Login to Continue",
                            });
                        } else {
                            return next();
                        }
                    }
                    /* Catching any error that might occur in the try block and returning a response with a
                           status code of 500 and an error message. */
                    catch (err) {
                        return res.status(500).json({
                            status: 'error',
                            error: err || "Oops an Error Occured on our Server. Please Try again Later",
                        });
                    }
                }
            } else {
                return res.status(401).json({
                    status: 'error',
                    error: "This user Id does Not Exist. Please Register and Try again",
                });
            }
        })
    }
};