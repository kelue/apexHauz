const CreateError = require('http-errors');

const Property = require("../models/Property");

const createProperty = async (req, res) => {
    const user = req.user;
    const property = Property.build(req.body);
    try {
        await property.save();
        await user.addProperty(property);
        res.status(201).json({
            status: 'success',
            data: property,
        });
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const getAllProperties = async (req, res) => {
    let noOfPropertiesToSkip;
    const page = req.query?.page ?? 1;
    const propertiesPerPage = 9;
    if (page <= 0) noOfPropertiesToSkip = 0;
    noOfPropertiesToSkip = (page - 1) * propertiesPerPage;
    try {
        const { count, rows: data } = await Property.findAndCountAll({
            limit: propertiesPerPage,
            offset: noOfPropertiesToSkip,
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

const getPropertyById = async (req, res) => {
    const id = req.params.id;
    try {
        const property = await Property.findByPk(id);
        if (!property) throw new CreateError(404, 'Property not found!');

        res.status(200).json({
            status: 'success',
            data: property,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const getPropertyUser = async (req, res) => {
    const id = req.params.id;
    try {
        const property = await Property.findByPk(id);
        if (!property) throw new CreateError(404, 'Property not found!');
        const user = await property.getProprietor();
        res.status(200).json({
            status: 'success',
            data: user,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const getPropertyCategory = async (req, res) => {
    const id = req.params.id;
    try {
        const property = await Property.findByPk(id);
        if (!property) throw new CreateError(404, 'Property not found!');
        const category = await property.getCategory();
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

const updatePropertyById = async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const updates = Object.keys(req.body);
    const allowedUpdates = Property.fillables;
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    try {
        if (!isValidOperation) throw new CreateError(400, 'Invlaid update operation');
        const property = await Property.findByPk(id);
        if (!property) throw new CreateError(404, 'Propery not found!');
        const isValidUserProperty = !user.is_admin ? await user.hasProperty(property) : true;
        if (!isValidUserProperty) throw new CreateError(403, 'Access denied!');

        const data = req.body;
        updates.forEach(update => {
            property[update] = data[update];
        })

        await property.save();
        res.status(200).json({
            status: 'success',
            data: property,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const deletePropertyById = async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    try {
        const property = await Property.findByPk(id);
        if (!property) throw new CreateError(404, 'Property not found!');
        const isValidUserProperty = !user.is_admin ? await user.hasProperty(property) : true;
        if (!isValidUserProperty) throw new CreateError(403, 'Access denied!');

        await property.destroy();
        res.status(200).json({
            status: 'success',
            data: property,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

module.exports = {
    createProperty,
    getAllProperties,
    getPropertyById,
    getPropertyUser,
    getPropertyCategory,
    updatePropertyById,
    deletePropertyById,
}