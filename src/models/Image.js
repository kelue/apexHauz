const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/mysql');

class Image extends Model { }

Image.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
})

module.exports = Image;