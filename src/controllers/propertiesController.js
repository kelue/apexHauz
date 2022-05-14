const Properties = require('../models/properties.js');
const Cloudinary = require('../utils/cloudinary');
const { createProperties } = require('../utils/validator');
const fs = require("fs");


/* Importing the database connection. */
const db = require("../config/db.config");
const { upload } = require("../utils/multer");
const { findUserById: findUserByIdQuery } = require('../database/queries/users');
const { findCategoryById: findCategoryByIdQuery } = require('../database/queries/categories');

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
};