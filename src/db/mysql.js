const path = require('path');

const { Sequelize } = require('sequelize');

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const { DB_NAME_SEQUELIZE, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME_SEQUELIZE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    timezone: '+01:00',
    logging: console.log,
});

/* const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

connect(); */
(async () => {
    try {
        await sequelize.sync();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();

module.exports = sequelize;