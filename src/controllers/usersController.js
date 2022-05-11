const User = require("../models/users.js");
const bcrypt = require('bcryptjs');
const status = require('../assets/constants');


exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(status.ERROR).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.createUser = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(status.BAD_REQUEST).send({
            message: "Content can not be empty!"
        });
    }

    // Create a User
    const { email, first_name, last_name, password, phone, address, is_admin } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = new User(email, first_name, last_name, hashPassword, phone, address, is_admin);

    if (checkUser(user) === false) {
        console.log("Email Exist");
        res.status(status.BAD_REQUEST).json({
            status: false,
            message: "Email or Phone Already Exist"
        });
    } else {
        // Save User in the database
        User.createUser(user, (err, data) => {
            if (err)
                res.status(status.ERROR).send({
                    message: err.message || "Some error occurred while creating the User."
                });
            else
                res.status(status.SUCCESS).json({
                    status: true,
                    message: "User created successfully",
                    data: data
                });
        });
    }
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
                    res.status(status.ERROR).send({
                        message: err.message || "Some error occurred while validating the User."
                    });
                } else {
                    const passwordMatch = bcrypt.compare(password, result.password);
                    if (passwordMatch) {
                        res.status(status.SUCCESS).json({
                            status: true,
                            message: "User Loggedin successfully",
                            password: result.password,
                        });
                    } else {
                        res.status(status.BAD_REQUEST).json({
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