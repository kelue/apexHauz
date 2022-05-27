const CreateError = require('http-errors');
const { Op } = require('sequelize');

const { uploadMultipleImages, delete: deleteImage } = require('../utils/cloudinary');

const Property = require("../models/Property");

const createProperty = async (req, res) => {
    const user = req.user;
    const property = Property.build(req.body);
    try {
        const newProperty = await property.save();
        await user.addProperty(newProperty);
        const images = await uploadMultipleImages(req.files);
        images.forEach(async (image) => {
            await newProperty.createImage(image);
        })
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
    noOfPropertiesToSkip = (page - 1) * propertiesPerPage;
    if (page <= 0) noOfPropertiesToSkip = 0;
    try {
        const { count, rows: data } = await Property.findAndCountAll({
            limit: propertiesPerPage,
            offset: noOfPropertiesToSkip,
            order: [['created_at', 'DESC']],
            include: [
                {
                    association: 'proprietor',
                    attributes: {
                        exclude: ['password', 'phone', 'address', 'email', 'created_at', 'updated_at'],
                    },
                },
                {
                    association: 'category',
                    attributes: {
                        exclude: ['created_at', 'updated_at'],
                    },
                },
                {
                    association: 'images',
                    attributes: {
                        exclude: ['created_at', 'updated_at'],
                    },
                },
            ],
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
        const property = await Property.findByPk(id, {
            include: [
                {
                    association: 'proprietor',
                    attributes: {
                        exclude: ['password', 'phone', 'address', 'email', 'created_at', 'updated_at'],
                    },
                },
                {
                    association: 'category',
                    attributes: {
                        exclude: ['created_at', 'updated_at'],
                    },
                }
            ],
        });
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

const getPropertyReports = async (req, res) => {
    const id = req.params.id;
    try {
        const property = await Property.findByPk(id, {
            include: {
                association: 'reports',
            }
        });
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

const getPropertyBySearchQuery = async (req, res) => {
    const type = req.query?.type ?? '';
    let noOfPropertiesToSkip;
    const page = req.query?.page ?? 1;
    const propertiesPerPage = 9;
    noOfPropertiesToSkip = (page - 1) * propertiesPerPage;
    if (page <= 0) noOfPropertiesToSkip = 0;
    try {
        const { count, rows: data } = await Property.findAndCountAll({
            where: {
                type: {
                    [Op.like]: `%${type}%`
                }
            },
            limit: propertiesPerPage,
            offset: noOfPropertiesToSkip,
            order: [['created_at', 'DESC']],
            include: [
                {
                    association: 'proprietor',
                    attributes: {
                        exclude: ['password', 'phone', 'address', 'email', 'created_at', 'updated_at'],
                    },
                },
                {
                    association: 'category',
                    attributes: {
                        exclude: ['created_at', 'updated_at'],
                    },
                }
            ],
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

const markAsSold = async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    try {
        const property = await Property.findByPk(id);
        if (!property) throw new CreateError(404, 'Property not found!');
        const isValidUserProperty = !user.is_admin ? await user.hasProperty(property) : true;
        if (!isValidUserProperty) throw new CreateError(403, 'Access denied!');

        property.status = 'sold';
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

        const images = await property.getImages();
        if (images.length > 0) {
            images.forEach(async (image) => {
                deleteImage(image.image_id);
            });
        }

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
    getPropertyReports,
    getPropertyBySearchQuery,
    updatePropertyById,
    markAsSold,
    deletePropertyById,
}