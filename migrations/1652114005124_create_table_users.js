module.exports = {
    "up": "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL, timestamp())",
    "down": ""
}