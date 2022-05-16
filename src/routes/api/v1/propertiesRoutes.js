const router = require("express").Router();
/* Importing the hasAuth middleware. */
const { hasAuth } = require('../../../middleware/hasAuth');
/* Importing the userController.js file. */
const propertiesController = require('../../../controllers/propertiesController');


/* Exporting the routes to the server.js file. */
module.exports = app => {
    /* This is a route that is used to get all the properties. */
    router.get("/properties", propertiesController.getAllProperties);

    /* This is a route that is used to create a new property. */
    router.post("/properties", hasAuth, propertiesController.createProperties);

    /* This is a route that is used to get a property by its id. */
    router.get("/properties/:id", hasAuth, propertiesController.getPropertiesById);

    router.patch("/properties/:id/sold", hasAuth, propertiesController.updatePropertyAsSold);

    app.use('/api/v1', router);

    // error handler
    /* This is a middleware that is used to catch any errors that may occur in the application. */
    app.use((err, req, res, next) => {
        /* This is a middleware that is used to catch any errors that may occur in the application. */
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    });
};