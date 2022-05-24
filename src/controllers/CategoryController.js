const CreateError = require('http-errors');

const Category = require("../models/Category");

const createCategory = async (req, res) => {
    const category = Category.build(req.body);
    try {
        await category.save();
        res.status(201).json({
            status: 'success',
            data: category,
        });
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const getAllCategories = async (req, res) => {
    let noOfCategoriesToSkip;
    const page = req.query?.page ?? 1;
    const categoriesPerPage = 9;
    if (page <= 0) noOfCategoriesToSkip = 0;
    noOfCategoriesToSkip = (page - 1) * categoriesPerPage;
    try {
        const { count, rows: data } = await Category.findAndCountAll({
            limit: categoriesPerPage,
            offset: noOfCategoriesToSkip,
            order: [['created_at', 'DESC']],
        });

        res.status(200).json({
            status: 'success',
            data,
            count,
        });
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const getCategoryById = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) return getCategoryBySlug(req, res);
    try {
        const category = await Category.findByPk(id);
        if (!category) throw new CreateError(404, 'Category not found!');

        res.status(200).json({
            status: 'success',
            data: category,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const getCategoryBySlug = async (req, res) => {
    const id = req.params.id;
    if (!isNaN(id)) return getCategoryByid(req, res);
    try {
        const category = await Category.findBySlug(id);
        if (!category) throw new CreateError(404, 'Category not found!');

        res.status(200).json({
            status: 'success',
            data: category,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const updateCategoryById = async (req, res) => {
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = Category.fillables;
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    try {
        if (!isValidOperation) throw new CreateError(400, 'Invlaid update operation');
        const category = await Category.findByPk(id);
        if (!category) throw new CreateError(404, 'Propery not found!');

        const data = req.body;
        updates.forEach(update => {
            category[update] = data[update];
        })

        await category.save();
        res.status(200).json({
            status: 'success',
            data: category,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const deleteCategoryById = async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findByPk(id);
        if (!category) throw new CreateError(404, 'Category not found!');

        await category.destroy();
        res.status(200).json({
            status: 'success',
            data: category,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const getCategoryPropertiesBySlug = async (req, res) => {
    const slug = req.params.slug ?? req.params.id;

    if (!isNaN(slug)) return getCategoryPropertiesById(req, res);

    try {
        const category = await Category.findBySlug(slug);
        if (!category) throw new CreateError(404, 'Category not found!');
        const properties = await category.getProperties();

        res.status(200).json({
            status: 'success',
            data: properties,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }

}

const getCategoryPropertiesById = async (req, res) => {
    const slug = req.params.slug ?? req.params.id;

    if (isNaN(slug)) return getCategoryPropertiesBySlug(req, res);

    try {
        const category = await Category.findByPk(slug);
        if (!category) throw new CreateError(404, 'Category not found!');
        const properties = await category.getProperties();

        res.status(200).json({
            status: 'success',
            data: properties,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }

}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
    getCategoryPropertiesBySlug,
}