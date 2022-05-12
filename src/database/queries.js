const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;
const createTableUsers = `
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    first_name VARCHAR(150) NOT NULL, 
    last_name VARCHAR(150) NOT NULL, 
    password VARCHAR(250) NOT NULL, 
    phone VARCHAR(20) NOT NULL, 
    address VARCHAR(255), 
    is_admin BOOLEAN DEFAULT FALSE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;

const findUserByEmail = `SELECT * FROM users WHERE email = ?`;

module.exports = {
    createDB,
    dropDB,
    createTableUsers,
    createNewUser,
    findUserByEmail
};