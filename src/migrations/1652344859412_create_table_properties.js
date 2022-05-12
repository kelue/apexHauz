module.exports = {
    "up": `CREATE TABLE properties (
        id UNSIGNED INT NOT NULL AUTO INCREMENT PRIMARY KEY,
        owner UNSIGNED INT NOT NULL,
        category UNSIGNED INT NOT NULL,
        status ENUM('sold','available') DEFAULT 'available',
        price FLOAT NOT NULL,
        state VARCHAR(50) NOT NULL,
        city VARCHAR(50) NOT NULL,
        address VARCHAR(50) NOT NULL,
        description TEXT,
        image_url VARCHAR(255) NOT NULL,
        image_id VARCHAR(150) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`,
    "down": "DROP TABLE properties"
}