/* Importing the database connection from the db.config.js file. */
const db = require("../config/db.config");
const {
    getAllProperties: getAllPropertiesQuery,
    getPropertyById: getPropertyByIdQuery,
    createNewProperty: createNewPropertyQuery,
    updatePropertyStatus: updatePropertyStatusQuery,
    deleteProperty: deletePropertyQuery,
    updatePropertyDetails: updatePropertyDetailsQuery
} = require("../database/queries/properties");


const {
    addExtraPropertyImages: addExtraPropertyImagesQuery
} = require("../database/queries/images");

const {
    createNewReport: createNewReportQuery
} = require('../database/queries/reports');

class Properties {
    /**
     * The constructor function is a special method for creating and initializing an object created
     * within a class.
     * @param title - String
     * @param description - String
     * @param price - number
     * @param category - String
     * @param image - the image file
     * @param user_id - the id of the user who created the product
     */
    constructor(user_id, category_id, price, state, city, address, description, image_url, image_id, status) {
        this.user_id = user_id;
        this.category_id = category_id;
        this.price = price;
        this.state = state;
        this.city = city;
        this.address = address;
        this.description = description;
        this.image_url = image_url;
        this.image_id = image_id;
        this.status = status;
    }

    /**
     * This function is called by the controller, and it calls the database to get all the properties.
     * @param result - This is the callback function that will be called when the query is complete.
     */
    static getAll(result) {
        db.query(getAllPropertiesQuery, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            result(null, res);
        });
    }

    /**
     * If the result is not an error, and the result is not empty, then return the result, otherwise
     * return an error.
     * @param id - the id of the property you want to get
     * @param result - This is the callback function that will be called when the query is complete.
     */
    static getById(id, result) {
        db.query(getPropertyByIdQuery, [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                result(null, res[0]);
                return;
            }

            // not found
            result({ kind: "not_found" }, null);
        });
    }

    /**
     * It creates a new property in the database
     * @param properties - {
     * @param result - is the callback function that returns the result of the query.
     */
    static createProperties(properties, result) {
        /* Creating a new property in the database. */
        db.query(createNewPropertyQuery, [
            properties.user_id,
            properties.category_id,
            properties.price,
            properties.state,
            properties.city,
            properties.address,
            properties.description,
            properties.image_url,
            properties.image_id,
            properties.status
        ], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            } else {
                /* Returning the result of the query. */
                const info = {
                    id: res.insertId,
                    user_id: properties.user_id,
                    category_id: properties.category_id,
                    price: properties.price,
                    state: properties.state,
                    city: properties.city,
                    address: properties.address,
                    description: properties.description,
                    image_url: properties.image_url,
                    image_id: properties.image_id,
                    status: properties.status
                };
                /* Returning the result of the query. */
                result(null, info);
                /* Returning the result of the query. */
                return;
            }
        });
    }
    static updatePropertyStatus(id, status, next) {
        db.query(updatePropertyStatusQuery, [
            status,
            id
        ], (err, res) => {
            if (err) {
                console.log("error: ", err);
                return;
            } else {
                return next();
            }
        })
    }
    static deleteProperty(id, next) {
        db.query(deletePropertyQuery, [
            id
        ], (err, res) => {
            if (err) {
                console.log("error: ", err);
                return;
            } else {
                return next();
            }
        })
    }

    static updatePropertyDetails(properties, result) {
        db.query(updatePropertyDetailsQuery, [
            properties.category_id,
            properties.price,
            properties.state,
            properties.city,
            properties.description,
            properties.address,
            properties.status,
            properties.image_url,
            properties.image_id,
            properties.id
        ], (err, res) => {
            if (err) {
                console.log("error: ", err);
                return;
            } else {
                const info = {
                    id: properties.id,
                    user_id: properties.user_id,
                    category_id: properties.category_id,
                    price: properties.price,
                    state: properties.state,
                    city: properties.city,
                    address: properties.address,
                    description: properties.description,
                    image_url: properties.image_url,
                    image_id: properties.image_id,
                    status: properties.status
                };
                result(null, info);
                return;
            }
        })
    }

    static addExtraPropertyImages(extra_images, result) {
        db.query(addExtraPropertyImagesQuery, [
            extra_images.property_id,
            extra_images.image_url,
            extra_images.image_id
        ], (err, res) => {
            if (err) {
                console.log("error: ", err);
                return;
            } else {
                const info = {
                    property_id: extra_images.property_id,
                    image_url: extra_images.image_url,
                    image_id: extra_images.image_id
                }
                return result(null, info);
            }
        })
    }

    static reportProperty(details, result) {
        db.query(createNewReportQuery, [
            details.user_id,
            details.property_id,
            details.reason,
            details.description
        ], (err, res) => {
            if (err) {
                console.log("error: ", err);
                return;
            } else {
                const info = {
                    id: res.insertId,
                    user_id: details.user_id,
                    property_id: details.property_id,
                    reason: details.reason,
                    description: details.description
                }
                return result(null, info);
            }
        })
    }
}


module.exports = Properties;