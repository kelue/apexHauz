const db = require("../config/db.config");


class User {
    constructor(email, first_name, last_name, hashPassword, password, phone, address, is_admin) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.hashPassword = hashPassword;
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
        db.query(`INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`, ['', newUser.email, newUser.first_name, newUser.last_name, newUser.hashPassword, newUser.phone, newUser.address, newUser.is_admin, ''], (err, res) => {
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