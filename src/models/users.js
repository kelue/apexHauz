const db = require("../config/db.config");


class User {
    constructor(email, first_name, last_name, password, phone, address, is_admin) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.is_admin = is_admin;
    }

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

    static createUser(newUser, result) {
        var date_ob = new Date();
        var day = ("0" + date_ob.getDate()).slice(-2);
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var year = date_ob.getFullYear();
        var hours = date_ob.getHours();
        var minutes = date_ob.getMinutes();
        var seconds = date_ob.getSeconds();
        var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        db.query(`INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['', newUser.email, newUser.first_name, newUser.last_name, newUser.password, newUser.phone, newUser.address, newUser.is_admin, dateTime, dateTime], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            //console.log("Created User: ", {...newUser });
            result(null, { id: res.insertId, ...newUser });
        });
    }

    static checkUser(newUser, callback) {
        db.query(`SELECT * FROM users WHERE email = ?`, [newUser.email], (err, result) => {
            if (!result.length) {
                console.log("found user");
                callback(null, result[0]);
                return;
            }
            //callback({ kind: "not_found" }, null);
            callback(null, result[0]);
            return;
        })
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

module.exports = User;