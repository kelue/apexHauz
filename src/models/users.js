/* Importing the database connection from the db.config.js file. */
const db = require("../config/db.config");


/* It's a class that handles all the database queries for the users table. */
class User {
    /**
     * The constructor function is a special function that is used to create and initialize an object
     * created within a class.
     * @param email - The email of the user.
     * @param first_name - The first name of the user.
     * @param last_name - String
     * @param password - The password for the user.
     * @param phone - A string of numbers, no spaces or dashes.
     * @param address - The address of the user.
     * @param is_admin - Boolean
     */
    constructor(email, first_name, last_name, password, phone, address, is_admin) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.is_admin = is_admin;
    }

    /**
     * This function is called when the user clicks the 'Get All Users' button on the front end. It
     * queries the database for all users and returns the result to the front end.
     * @param result - This is the callback function that will be called when the query is complete.
     */
    static getAll(result) {
        db.query('SELECT * FROM users', (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            //console.log("users: ", res);
            result(null, res);
        });
    }

    /**
     * It takes in a newUser object and a result function, then it creates a new user in the database
     * @param newUser - {
     * @param result - is a callback function that is passed to the createUser function.
     */
    static createUser(newUser, result) {
        /* It's getting the current date and time and formatting it to be inserted into the database. */
        var date_ob = new Date();
        var day = ("0" + date_ob.getDate()).slice(-2);
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var year = date_ob.getFullYear();
        var hours = date_ob.getHours();
        var minutes = date_ob.getMinutes();
        var seconds = date_ob.getSeconds();
        var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        db.query(`INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['', newUser.email, newUser.first_name, newUser.last_name, newUser.password, newUser.phone, newUser.address, newUser.is_admin, dateTime, dateTime], (err, res) => {
            /* It's checking to see if there is an error. If there is an error, it will log the error to
            the console and return the error. */
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            /* It's returning the id of the user that was just created and the newUser object. */
            result(null, { id: res.insertId, ...newUser });
        });
    }

    static loginUser(newUser, callback) {
        db.query(`SELECT * FROM users WHERE email = ?`, [newUser.email], (err, result) => {
            if (err) {
                console.log("error: ", err);
                return;
            }
            callback(null, result[0]);
            return;
            // result(null, { id: res.insertId, ...newUser });
        })
    }
}

/* It's exporting the User class so that it can be used in other files. */
module.exports = User;