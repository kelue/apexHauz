const User = require("../models/users.js");


exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.createUser = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a User
    const { email, phone } = req.body;
    const user = new User(email, phone);

    if (checkUser(user) === false) {
        console.log("Email Exist");
        res.status(400).json({
            status: false,
            message: "Email or Phone Already Exist"
        });
    } else {
        // Save User in the database
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
};

function checkUser(newUser) {
    if (User.checkUser(newUser) === false) {
        return false;
    } else {
        return false;
    }
}