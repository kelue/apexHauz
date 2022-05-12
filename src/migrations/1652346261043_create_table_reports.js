module.exports = {
    "up": `CREATE TABLE reports (
        id UNSIGNED INT NOT NULL AUTO INCREMENT PRIMARY KEY,
        property UNSIGNED INT NOT NULL,
        whistle_blower UNSIGNED INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`,
    "down": "DROP TABLE reports"
}