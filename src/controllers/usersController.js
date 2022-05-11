const User = require("../models/users.js")
const bcrypt = require('bcryptjs')
const { signup } = require('../utils/validator');
const Response = require("../utils/responseHandler.js");
const db = require("../config/db.config");


exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.createUser = async(req, res) => {
    // Create user
    const { email, first_name, last_name, password, phone, address, is_admin } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    const { errors, valid } = signup(email, password, phone, first_name, last_name, address);
    const eSpace = email.indexOf(' ') >= 0;
    if (!valid) {
        return Response.send(
            res.status(401),
            false,
            errors
        );
    } else
    if (eSpace == true) {
        return Response.send(
            res.status(401),
            false, [{ msg: "Email cannot contain spaces" }]
        );
    } else {
        db.query(`SELECT * FROM users WHERE email = ?`, [email], function(err, result) {
            if (result.length > 0) {
                return Response.send(
                    res.status(401),
                    false, {
                        msg: "This Email Address Already Exists"
                    }
                );
            } else {
                const password = hashPassword;
                const user = new User(email, first_name, last_name, password, phone, address, is_admin);
                User.createUser(user, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the User."
                        });
                    else
                        res.status(200).json({
                            status: true,
                            message: "User created successfully",
                            data: data
                        });
                });
            }

        });
    }



    //const user = new User(email, first_name, last_name, hashPassword, phone, address, is_admin);

    // /* Checking if the user exist in the database. */
    // if (checkUser(user) === false) {
    //     console.log("Email Exist");
    //     res.status(400).json({
    //         status: false,
    //         message: "Email or Phone Already Exist"
    //     });
    // } else {
    //     // Save User in the database
    //     User.createUser(user, (err, data) => {
    //         if (err)
    //             res.status(500).send({
    //                 message: err.message || "Some error occurred while creating the User."
    //             });
    //         else
    //             res.status(200).json({
    //                 status: true,
    //                 message: "User created successfully",
    //                 data: data
    //             });
    //     });
    // }
};

function checkUser(user) {
    const checkUser = User.checkUser(user, (err, result) => {
        if (err) {
            return false;
        } else {
            if (result.email == null) {
                return true;
            }
        }
    });


}

exports.loginUser = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({ msg: "Please fill in all fields" })
    } else {
        const newUser = new User(email, password);

        try {
            const foundUser = User.loginUser(newUser, (err, result) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while validating the User."
                    });
                } else {
                    const passwordMatch = bcrypt.compare(password, result.password);
                    if (passwordMatch) {
                        res.status(200).json({
                            status: true,
                            message: "User Loggedin successfully",
                            password: result.password,
                        });
                    } else {
                        res.status(400).json({
                            status: false,
                            message: "Invalid Email and Password"
                        });
                    }
                }
            });
            //const foundUser = true;
            // if (foundUser) {
            //     let submittedPass = req.body.password;
            //     let storedPass = '$2a$10$Le98/.Djlv79HZuJxDLAZOkkNNgZ5FXptNWJjjIesTgEiwT5yNEWW';
            //     const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            //     if (passwordMatch) {
            //         res.json("Login Successful");
            //     } else {
            //         res.json("Invalid Email or Password");
            //     }
            // }
        } catch (err) {
            res.send("Error: " + err);
        }
    }
};