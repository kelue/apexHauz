/* Importing the database connection from the db.config.js file. */
const db = require("../config/db.config");
const {
    getAllProperties: getAllPropertiesQuery,
    getPropertyById: getPropertyByIdQuery,
    createNewProperty: createPropertyQuery,
} = require("../database/queries/properties");

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
    constructor(title, description, price, category, image, user_id) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.image = image;
        this.category = category;
        this.user_id = user_id;
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

    static createProperties(properties, result) {
        db.query(createNewPropertiesQuery, []);
    }
}


module.exports = Properties;