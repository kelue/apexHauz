require('dotenv').config();

const {
    DB_PORT,
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
    JWT_SECRET_KEY
} = process.env;

const requiredCredentials = [
    'DB_PORT',
    'DB_HOST',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_DATABASE',
    'JWT_SECRET_KEY'
];

for (const credential of requiredCredentials) {
    // if (!process.env[credential]) {
    //     process.exit(1);
    // }
}

module.exports = {
    DB_PORT,
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
    JWT_SECRET_KEY
};