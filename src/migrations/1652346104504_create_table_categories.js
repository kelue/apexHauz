module.exports = {
    "up": `CREATE TABLE categories (
        id UNSIGNED INT NOT NULL AUTO INCREMENT PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        slug VARCHAR(250),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`,
    "down": "DROP TABLE categories"
}