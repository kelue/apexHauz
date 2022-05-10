require('dotenv').config()
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  })

module.exports = connection;