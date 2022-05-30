const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/mysql');

class Report extends Model {
    static fillables = ['reason', 'description'];
}

Report.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})

module.exports = Report;