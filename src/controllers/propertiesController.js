const Properties = require('../models/properties.js');

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

// exports.getPropertiesById = (req, res) => {
//     /* A function that returns a property by its id. */
//     Properties.getById((err, data) => {
//         if (err)
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving property."
//             });
//         else res.send(data);
//     });
// }

exports.getPropertiesById = (req, res) => {
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