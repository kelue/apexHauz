const { DataTypes, Model } = require('sequelize');

const sequelize = require('../db/mysql');

const Image = require('./Image');
const Report = require('./Report');

class Property extends Model {
    static fillables = ['owner', 'name', 'status', 'price', 'state', 'city', 'address', 'type', 'image_url', 'image_id', 'category_id'];
}

Property.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('available', 'sold'),
        defaultValue: 'available',
        validate: {
            isIn: [['available', 'sold']],
        }
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isNumeric: true,
        }
    },
    state: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
    },
    image_id: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'Property',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Relationships
Property.hasMany(Image, {
    onDelete: 'CASCADE',
    as: 'images'
});
Image.belongsTo(Property);

Property.hasMany(Report, {
    foreignKey: 'property_id',
    onDelete: 'CASCADE',
    as: 'reports',
});
Report.belongsTo(Property, {
    foreignKey: 'property_id',
    as: 'property',
});

module.exports = Property;