/* Importing the user model. */
const User = require("../models/users.js")

/* A library that helps you hash passwords. */
const bcrypt = require('bcryptjs');

const sendEMail = require('../utils/sendmail');

const randomToken = require('rand-token');

/* Importing the signup function from the validator file. */
const { signup, signin } = require('../utils/validator');

/* A function that returns a response object. */
const Response = require("../utils/responseHandler.js");

/* Importing the database connection. */
const db = require("../config/db.config");

/* Importing the generateToken function from the token.js file. */
const { generate: generateToken } = require('../utils/token');

/* Importing the findUserByEmail function from the queries.js file. */
const { findUserByEmail: findUserByEmailQuery } = require('../database/queries/users');

const {
    findResetTokenRowByUserId: findResetTokenRowByUserIdQuery,
    findResetToken: findResetTokenQuery,
    deleteResetToken: deleteResetTokenQuery
} = require('../database/queries/passwordResets');


/* A function that returns all users in the database. */
exports.findAll = (req, res) => {
    /* A function that returns all users in the database. */
    User.getAll((err, data) => {
        /* A callback function that returns an error message if there is an error and returns the data
        if there is no error. */
        if (err)
        /* Returning an error message if there is an error. */
            res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
        else res.send(data);
    });
};

/* A function that creates a user. */
exports.createUser = async(req, res) => {
    // Create user
    /* Destructuring the request body. */
    const { email, first_name, last_name, password, phone, address, is_admin } = req.body;

    if (!(email && first_name && last_name && password && phone && address)) {
        res.status(401).json({
            status: 'error',
            error: "All fields are required"
        });
    } else {
        /* Generating a salt for the password. */
        const salt = bcrypt.genSaltSync(10);
        /* Hashing the password. */
        const hashPassword = await bcrypt.hashSync(password.trim(), salt);

        /* Destructuring the signup function. */
        const { errors, valid } = signup(email, password, phone, first_name, last_name, address);

        /* Checking if the email contains a space. */
        const eSpace = email.indexOf(' ') >= 0;

        /* Checking if the email, password, phone, first_name, last_name and address are valid. */
        if (!valid) {
            return Response.send(
                /* Returning an error message if the email, password, phone, first_name, last_name and
                address are not valid. */
                res.status(401),
                'error',
                errors
            );
        } else
        /* Checking if the email contains a space. */
        if (eSpace == true) {
            /* Returning an error message if the email contains a space. */
            return Response.send(
                res.status(401),
                false, [{ msg: "Email cannot contain spaces" }]
            );
        } else {
            /* Checking if the email already exists in the database. */
            db.query(findUserByEmailQuery, [
                email
            ], function(err, result) {
                /* Checking if the email already exists in the database. */
                if (result.length > 0) {
                    res.status(401).json({
                        status: 'error',
                        error: "Email already exists",
                    });
                } else {
                    /* Assigning the hashed password to the password variable. */
                    const password = hashPassword;

                    /* Creating a new user. */
                    const user = new User(email.trim(), first_name.trim(), last_name.trim(), password, phone.trim(), address, is_admin);
                    /* Creating a user. */
                    User.createUser(user, (err, data) => {
                        /* Returning an error message if there is an error. */
                        if (err)
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the User."
                            });
                        /* Returning a success message if the user is created. */
                        else
                            var token = generateToken(data.id);
                        res.status(200).json({
                            status: 'success',
                            data: {
                                token,
                                data
                            }
                        });
                    });
                }

            });
        }
    }
};

/* A function that logs in a user. */
exports.loginUser = async(req, res) => {
    /* Destructuring the request body. */
    const { email, password } = req.body;

    if (!(email && password)) {
        res.status(401).json({
            status: 'error',
            error: "All fields are required"
        });
    } else {
        /* Destructuring the signin function. */
        const { errors, valid } = signin(email, password);

        /* Checking if the email and password are valid. */
        if (!valid) {
            return Response.send(
                res.status(401),
                false,
                errors
            );

        } else {
            /* Checking if the email exists in the database. */
            db.query(findUserByEmailQuery, [
                email
            ], function(err, result) {
                /* Checking if the email exists in the database. */
                if (result.length > 0) {
                    /* Assigning the first user in the database to the user variable. */
                    const user = result[0];
                    /* Comparing the password entered by the user with the password in the database. */
                    const passwordIsValid = bcrypt.compareSync(password, user.password);
                    /* Checking if the password entered by the user is valid. */
                    if (passwordIsValid) {
                        /* Generating a token for the user. */
                        const token = generateToken(user.id);
                        /* Returning a success message if the user is logged in. */
                        res.status(201).json({
                            status: 'success',
                            data: {
                                token,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                email: user.email
                            }
                        });
                    } else {
                        /* Returning an error message if the password entered by the user is incorrect. */
                        res.status(401).json({
                            status: 'error',
                            error: "Incorrect Password. Please Try Again",
                        });
                    }
                } else {
                    /* Returning an error message if the email does not exist in the database. */
                    res.status(401).json({
                        status: 'error',
                        error: "User Does Not Exist",
                    });
                }
            });
        }
    }
};

exports.forgotPassword = async(req, res) => {
    const { email } = req.body;
    const serverUrl = req.protocol + '://' + req.get('host');
    if (!email) {

    } else {
        db.query(findUserByEmailQuery, [
            email
        ], function(err, result) {
            if (result.length > 0) {
                const token = randomToken.generate(200);
                const user_id = result[0].id;
                const details = { email, token, user_id, serverUrl };

                db.query(findResetTokenRowByUserIdQuery, [
                    user_id
                ], function(err, result) {
                    if (result.length > 0) {

                        User.updateResetToken(details, (err, data) => {
                            if (err) {
                                res.status(500).send({
                                    message: err.message || "Some error occurred while creating the Reset Token."
                                });
                            } else {
                                sendEMail.mailFunction(details, (err, data) => {
                                    if (err) {
                                        res.status(500).json({
                                            status: 'error',
                                            error: err || "Some error occurred while sending the email."
                                        });
                                    } else {
                                        res.status(200).json({
                                            status: 'success',
                                            data: {
                                                message: "Reset Password Email Sent to " + email
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    } else {
                        User.createResetToken(details, (err, data) => {
                            if (err) {
                                res.status(500).send({
                                    message: err.message || "Some error occurred while creating the Reset Token."
                                });
                            } else {
                                sendEMail.mailFunction(details, (err, data) => {
                                    if (err) {
                                        res.status(500).json({
                                            status: 'error',
                                            error: err || "Some error occurred while sending the email."
                                        });
                                    } else {
                                        res.status(200).json({
                                            status: 'success',
                                            data: {
                                                message: "Reset Password Email Sent to " + email
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    }
                });
            } else {
                res.status(404).json({
                    status: 'error',
                    error: "Email address Does Not Exist",
                });
            }
        });
    }
}

exports.resetPassword = async(req, res) => {
    const { token, new_password } = req.body;
    if (!(token && new_password)) {
        res.status(401).json({
            status: 'error',
            error: "Reset Token and New Password are Required"
        });
    } else {
        db.query(findResetTokenQuery, [
            token
        ], function(err, result) {
            if (result.length > 0) {
                const user_id = result[0].user_id;
                /* Generating a salt for the password. */
                const salt = bcrypt.genSaltSync(10);
                /* Hashing the password. */
                const password = bcrypt.hashSync(new_password.trim(), salt);
                const details = { user_id, password };
                User.updateUserPassword(details, (err, data) => {
                    if (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while updating the password."
                        });
                    } else {
                        db.query(deleteResetTokenQuery, [
                            token
                        ], function(err, result) {
                            if (!err) {
                                res.status(200).json({
                                    status: 'success',
                                    data: {
                                        message: "Password Updated Successfully"
                                    }
                                });
                            } else {
                                res.status(500).json({
                                    status: 'error',
                                    error: "Oops an Error Occured on our servers. Try Reseting Your password again."
                                });
                            }
                        })
                    }
                });
            } else {
                res.status(401).json({
                    status: 'error',
                    error: "Reset Token is Invalid. Try Reseting Your Password"
                });
            }
        })
    }
}