module.exports = {
    "up": "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, first_name VARCHAR(255), last_name VARCHAR(255), password VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, address VARCHAR(255), is_admin BOOLEAN DEFAULT FALSE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    "down": "DROP table users"
}