const Properties = require('../models/properties.js');
const Cloudinary = require('../utils/cloudinary');
const { createProperties } = require('../utils/validator');
const fs = require("fs");
const { upload } = require("../utils/multer");

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


exports.createProperties = async(req, res) => {
    /* A function that creates a property. */
    const { user_id, category_id, price, state, city, address, description, image, status } = req.body;

    const { errors, valid } = createProperties(state, city, address, description);

    if (!valid) {
        return Response.send(
            res.status(401),
            'error',
            errors
        )
    } else {
        /* Destructuring the request body. */
        try {
            //upload.single(image);
            Cloudinary.UploadImage(image, (err, data) => {
                if (err)
                    res.status(500).json({
                        status: 'error',
                        error: err.message || "Some error occurred while uploading Image"
                    });

                else {
                    const { secure_url, public_id } = data;
                    // res.status(201).json({
                    //     status: 'success',
                    //     data: {
                    //         image_path: secure_url,
                    //         image_id: public_id
                    //     }
                    // });
                    const image_url = secure_url;
                    const image_id = public_id;
                    const properties = new Properties(user_id, category_id, price, state, city, address, description, image_url, image_id, status);
                    Properties.createProperties(properties, (err, data) => {
                        if (err) {
                            res.status(500).json({
                                status: 'error',
                                error: err.message || "Some error occurred while creating the Property."
                            });
                        } else {
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
    }
};