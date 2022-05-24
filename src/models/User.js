const { DataTypes, Model } = require('sequelize');
const CreateError = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const sequelize = require('../db/mysql');
const { generateJWTToken } = require('../utils/helpers');
const Property = require('./Property');

class User extends Model {
    static fillables = ['first_name', 'last_name', 'email', 'password', 'phone', 'address'];

    toJSON = function () {
        const user = this;

        delete user.dataValues.password;

        return user.dataValues;
    }

    genAuthToken = async function () {
        const user = this;
        const token = generateJWTToken({ ...user.dataValues }, process.env.JWT_SECRET_KEY, '10m');

        return token;
    }

    static findByCredentials = async function (email, password) {
        const user = await User.findOne({
            where: {
                email,
            }
        })

        if (!user || !await bcrypt.compare(password, user.password)) throw new CreateError(401, 'Invalid email or password!');

        return user;
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    full_name: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.first_name} ${this.last_name}`;
        },
        set(value) {
            throw new CreateError(422, 'Do not try to set the `fullName` value!');
        },
    },
    email: {
        type: DataTypes.STRING(190),
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING(250),
        allowNull: false,
        validate: {
            len: [6, 50],
        }
    },
    phone: DataTypes.STRING(20),

    address: DataTypes.STRING,
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    sequelize,
    modelName: 'User',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})

// Relatioships
User.hasMany(Property, {
    foreignKey: 'owner',
});
Property.belongsTo(User, {
    foreignKey: 'owner',
    as: 'proprietor',
});

User.beforeSave(async function (user) {
    user.password = await bcrypt.hash(user.password, 10);
})

module.exports = User;