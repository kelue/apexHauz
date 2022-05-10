require('dotenv').config();
const mysql = require('mysql');
const migration = require('mysql-migrations');

const connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env['DB_HOST'],
    user: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_DATABASE']
});

migration.init(connection, __dirname + '/migrations', function() {
    console.log("finished running migrations");
});