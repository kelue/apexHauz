/* Importing the database connection from the db.config.js file. */
const db = require("../config/db.config");
const { getAllProperties: getAllPropertiesQuery } = require("../database/queries");



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
}


module.exports = Properties;