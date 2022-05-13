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