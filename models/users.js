const db = require("../config/db.config");

class User {
    constructor(email, phone) {
        this.email = email;
        this.phone = phone;
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
        db.query(`INSERT INTO users VALUES(?, ?, ?)`, ['', newUser.email, newUser.phone], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            //console.log("Created User: ", {...newUser });
            result(null, { id: res.insertId, ...newUser });
        });
    }

    static checkUser(newUser, result) {
        db.query(`SELECT * FROM users WHERE email = ? AND phone = ?`, [newUser.email, newUser.phone], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            } else {
                return true;
            }

            //result(null, { id: res.insertId, ...newUser });
        })
    }
}

module.exports = User;