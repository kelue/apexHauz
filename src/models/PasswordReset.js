const { DataTypes, Model } = require('sequelize');

const sequelize = require('../db/mysql');

class PasswordReset extends Model { }

PasswordReset.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: false,
})

module.exports = PasswordReset;