const { DB_NAME } = require('../config/db.config');


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


const createTableCategories = `
CREATE TABLE IF NOT EXISTS categories (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) DEFAULT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;


const createTableProperties = `
CREATE TABLE IF NOT EXISTS properties (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    price INT NOT NULL,
    description TEXT DEFAULT NULL,
    image_url VARCHAR(255) DEFAULT NULL,
    image_id VARCHAR(255) DEFAULT NULL,
    is_sold BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;


const createNewUser = `
INSERT INTO users VALUES(null, ? , ? , ? , ? , ? , ? , ? , NOW(), NOW())
`;


const findUserByEmail = `
SELECT * FROM users WHERE email = ? `;


const createPropertiesUserForeignKeys = `
ALTER TABLE properties ADD CONSTRAINT properties_user_id_users_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
`;


const createPropertiesCategoriesForeignKeys = `
ALTER TABLE properties ADD CONSTRAINT properties_categories_id_categories_id FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE;
`;


const getAllProperties = `
SELECT * FROM properties
`;


const getPropertyById = `
SELECT * FROM properties WHERE id = ?
`;

module.exports = {
    createDB,
    dropDB,
    createTableUsers,
    createTableCategories,
    createTableProperties,
    createNewUser,
    findUserByEmail,
    createPropertiesUserForeignKeys,
    createPropertiesCategoriesForeignKeys,
    getAllProperties,
    getPropertyById
};