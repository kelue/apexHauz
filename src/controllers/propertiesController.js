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
    const { type, state, city, address, price, image } = req.body;
    // const { image_path } = req.file;
    const { errors, valid } = createProperties(type, state, city, address);

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
                    const { image_secure_url, image_public_id } = data;
                    res.status(201).json({
                        status: 'success',
                        data: {
                            image_path: secure_url,
                            image_id: public_id
                        }
                    })

                    // const newProperties = new Properties({
                    //     type,
                    //     state,
                    //     city,
                    //     address,
                    //     price,
                    //     image_path
                    // });
                    // /* Saving the property to the database. */
                    // newProperties.save((err, data) => {
                    //     if (err)
                    //         res.status(500).send({
                    //             message: err.message || "Some error occurred while creating the Property."
                    //         });
                    //     else res.send(data);
                    // });
                    const properties = new Properties(type, state, city, address, price, image_secure_url, image_public_id);
                    Properties.createProperties(properties, (err, data) => {
                        if (err)
                            res.status(500).json({
                                status: 'error',
                                error: err.message || "Some error occurred while creating the Property."
                            });
                        else
                            res.status(201).json({
                                status: 'success',
                                data: {
                                    id: data.id,
                                    status: data.status || "available",
                                    price: data.price,
                                    state: data.state,
                                    city: data.city,
                                    address: data.address,
                                    type: data.type,
                                    image_url: data.image_url,
                                    created_on: data.created_on
                                }
                            })
                    });
                }
            });
            // const properties = new Properties(type, state, city, address, price, result.secure_url, result.public_id);
            // Properties.createProperties(properties, (err, data) => {
            //     if (err)
            //         res.status(500).json({
            //             status: 'error',
            //             error: err.message || "Some error occurred while creating the Property."
            //         });
            //     else
            //         res.status(201).json({
            //             status: 'success',
            //             data: {
            //                 id: data.id,
            //                 status: data.status || "available",
            //                 price: data.price,
            //                 state: data.state,
            //                 city: data.city,
            //                 address: data.address,
            //                 type: data.type,
            //                 image_url: data.image_url,
            //                 created_on: data.created_on
            //             }
            //         })
            // });
        } catch (err) {
            console.log(err);
        }
    }
};