module.exports = {
    "up": "CREATE TABLE properties (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, phone_number VARCHAR(255) NOT NULL, )",
    "down": "DROP TABLE properties"
}
lll