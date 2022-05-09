const db = require('mysql');
const migration = require('mysql-migrations');

const connection = db.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sidehustlerestapi'
});

migration.init(connection, __dirname + '/migrations', function() {
    console.log("finished running migrations");
});