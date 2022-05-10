module.exports = {
    "up": "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL)",
    "down": "DROP table users"
}