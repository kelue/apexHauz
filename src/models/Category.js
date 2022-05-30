const { DataTypes, Model, Op } = require('sequelize');
const { default: slugify } = require('slugify');

const sequelize = require('../db/mysql');
const Property = require('./Property');

class Category extends Model {
    static fillables = ['name', 'slug'];

    static findBySlug = async (slug) => {
        return await this.findOne({
            where: {
                slug,
            }
        })
    }
}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
    },
}, {
    sequelize,
    modelName: 'Category',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Category.beforeSave(function (category) {
    const slug = slugify(category.getDataValue('name'), {
        strict: true,
        lower: true,
    });
    console.log(category.name, slug);
    category.slug = slug;
});

// Relationships
Category.hasMany(Property, {
    foreignKey: 'category_id'
});
Property.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category',
});

module.exports = Category;