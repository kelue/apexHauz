module.exports = {
    "up": `CREATE TABLE users (
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
        )`,
    "down": "DROP TABLE users"
}