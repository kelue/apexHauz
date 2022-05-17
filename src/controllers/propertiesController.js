const Properties = require('../models/properties.js');
const Cloudinary = require('../utils/cloudinary');
const { createProperties, validateIdAsNumeric } = require('../utils/validator');


/* Importing the database connection. */
const db = require("../config/db.config");
const { findUserById: findUserByIdQuery } = require('../database/queries/users');
const { findCategoryById: findCategoryByIdQuery } = require('../database/queries/categories');
const { getPropertyById: getPropertyByIdQuery, updatePropertyStatus: updatePropertyStatusQuery } = require('../database/queries/properties');

/* A function that returns a response object. */
const Response = require("../utils/responseHandler.js");

exports.getAllProperties = (req, res) => {
    /* A function that returns all properties in the database. */
    Properties.getAll((err, data) => {
        /* A callback function that returns an error message if there is an error and returns the data
        if there is no error. */
        if (err)
        /* Returning an error message if there is an error. */
            res.status(500).send({
            message: err.message || "Some error occurred while retrieving properties."
        });
        else res.send(data);
    });
}

/* A function that returns a property by its id. */
exports.getPropertiesById = (req, res) => {
    /* A function that returns a property by its id. */
    Properties.getById(Number(req.params.id), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Properties with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Property with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};


/* A function that creates a property. */
exports.createProperties = async(req, res) => {
    /* Destructuring the request body. */
    const { user_id, category_id, price, state, city, address, description, image, status } = req.body;

    /* Checking if all the fields are filled. */
    if (!(user_id && category_id && price && state && city && address && description && image && status)) {
        res.status(401).json({
            status: 'error',
            error: "All fields are required"
        });
    } else {

        /* Destructuring the createProperties function. */
        const { errors, valid } = createProperties(state, city, address, description);
        /* Checking if the validation is valid or not. */
        if (!valid) {
            return Response.send(
                res.status(401),
                'error',
                errors
            )
        } else {
            /* Destructuring the request body. */
            /* Uploading the image to cloudinary. */
            db.query(findUserByIdQuery, [
                user_id
            ], function(err, result) {
                if (result.length > 0) {
                    db.query(findCategoryByIdQuery, [
                        category_id
                    ], function(err, result) {
                        if (result.length > 0) {
                            try {
                                //upload.single(image);
                                /* Uploading the image to cloudinary. */
                                // fs.unlink(req.file.path);
                                Cloudinary.UploadImage(image, (err, data) => {
                                    /* Checking if there is an error and returning an error message if there is an error. */
                                    if (err)
                                        res.status(500).json({
                                            status: 'error',
                                            error: err.message || "Some error occurred while uploading Image"
                                        });

                                    else {
                                        /* Destructuring the data object. */
                                        const { secure_url, public_id } = data;
                                        /* Destructuring the data object. */
                                        const image_url = secure_url;
                                        const image_id = public_id;
                                        /* Creating a new instance of the Properties class. */
                                        const properties = new Properties(user_id, category_id, price, state, city, address, description, image_url, image_id, status);
                                        /* Creating a new property. */
                                        Properties.createProperties(properties, (err, data) => {
                                            if (err) {
                                                res.status(500).json({
                                                    status: 'error',
                                                    error: err.message || "Some error occurred while creating the Property."
                                                });
                                            } else {
                                                /* Returning a response object. */
                                                res.status(201).json({
                                                    status: 'success',
                                                    data: {
                                                        id: data.id,
                                                        user_id: data.user_id,
                                                        category_id: data.category_id,
                                                        price: data.price,
                                                        state: data.state,
                                                        city: data.city,
                                                        address: data.address,
                                                        description: data.description,
                                                        image_url: data.image_url,
                                                        image_id: data.image_id,
                                                        status: data.status || "available",
                                                        created_on: data.created_on
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            } catch (err) {
                                console.log(err);
                            }
                        } else {
                            res.status(401).json({
                                status: 'error',
                                error: "Category Does Not Exist",
                            });
                        }
                    });
                } else {
                    res.status(401).json({
                        status: 'error',
                        error: "User Does Not Exist",
                    });
                }
            });
        }
    }
};

exports.updatePropertyAsSold = (req, res) => {
    const { id } = req.params;
    if (!(id)) {
        res.status(401).json({
            status: 'error',
            error: "All fields are required"
        });
    } else {
        const status = 'sold';
        const { errors, valid } = validateIdAsNumeric(id);

        if (!valid) {
            return Response.send(
                res.status(401),
                'error',
                errors
            )
        } else {
            db.query(getPropertyByIdQuery, [
                id
            ], function(err, result) {
                if (result.length > 0) {
                    if (result[0].user_id == req.body.user_id) {
                        Properties.updatePropertyStatus(id, status, (err, data) => {
                            if (err) {
                                console.log("error: ", err);
                            } else {
                                if (result[0].status === 'available') {
                                    res.status(401).json({
                                        status: 'success',
                                        data: {
                                            id: result[0].id,
                                            user_id: result[0].user_id,
                                            category_id: result[0].category_id,
                                            price: result[0].price,
                                            state: result[0].state,
                                            city: result[0].city,
                                            address: result[0].address,
                                            description: result[0].description,
                                            image_url: result[0].image_url,
                                            image_id: result[0].image_id,
                                            status: 'sold',
                                            created_on: result[0].created_on
                                        }
                                    });
                                } else {
                                    res.status(401).json({
                                        status: 'error',
                                        error: "This Property has Already Been Sold",
                                    });
                                }
                            }
                        })
                    } else {
                        res.status(401).json({
                            status: 'error',
                            error: "Oops You Are Not Authorized To Update This Property",
                        });
                    }
                } else {
                    res.status(401).json({
                        status: 'error',
                        error: "This Property Does Not Exist",
                    });
                }
            })
        }
    }
};

/* The above code is deleting a property from the database. */
exports.deleteProperties = (req, res) => {
    const { id } = req.params;
    if (!(id)) {
        res.status(401).json({
            status: 'error',
            error: "All fields are required"
        });
    } else {
        const { errors, valid } = validateIdAsNumeric(id);

        if (!valid) {
            return Response.send(
                res.status(401),
                'error',
                errors
            )
        } else {
            db.query(getPropertyByIdQuery, [
                id
            ], function(err, result) {
                if (result.length > 0) {
                    if (result[0].user_id == req.body.user_id) {
                        Properties.deleteProperty(id, (err, data) => {
                            if (err) {
                                console.log("error: ", err);
                            } else {
                                res.status(201).json({
                                    status: 'success',
                                    data: {
                                        id: result[0].id,
                                        user_id: result[0].user_id,
                                        category_id: result[0].category_id,
                                        price: result[0].price,
                                        state: result[0].state,
                                        city: result[0].city,
                                        address: result[0].address,
                                        description: result[0].description,
                                        image_url: result[0].image_url,
                                        image_id: result[0].image_id,
                                        status: result[0].status,
                                        created_on: result[0].created_on
                                    }
                                });
                            }
                        })
                    } else {
                        res.status(401).json({
                            status: 'error',
                            error: "Oops You Are Not Authorized To Delete This Property",
                        });
                    }
                } else {
                    res.status(401).json({
                        status: 'error',
                        error: "This Property Does Not Exist",
                    });
                }
            })
        }
    }
};