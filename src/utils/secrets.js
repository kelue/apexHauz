require('dotenv').config();

const {
    DB_NAME,
    JWT_SECRET_KEY
} = process.env;

const requiredCredentials = [
    'DB_NAME',
    'JWT_SECRET_KEY'
];

for (const credential of requiredCredentials) {
    if (!process.env[credential]) {
        console.log(`Missing important ${credential} in .env file`);
        process.exit(1);
    }
}

module.exports = {
    DB_NAME,
    JWT_SECRET_KEY
};