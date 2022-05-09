module.exports = {
    "up": "CREATE TABLE properties (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, category_id INT NOT NULL, )",
    "down": "DROP TABLE properties"
}