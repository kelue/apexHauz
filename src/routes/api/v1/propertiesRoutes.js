const router = require("express").Router();
/* Importing the hasAuth middleware. */
const { hasAuth } = require('../../../middleware/hasAuth');
/* Importing the userController.js file. */
const propertiesController = require('../../../controllers/propertiesController');

const { upload } = require("../../../utils/multer");

/* Exporting the routes to the server.js file. */
module.exports = app => {
    /* This is a route that is used to get all the properties. */
    router.get("/property", propertiesController.getAllProperties);

    router.get("/property/search", propertiesController.searchForProperty);

    /* This is a route that is used to create a new property. */
    router.post("/property", hasAuth, upload.single('image'), propertiesController.createProperties);

    /* This is a route that is used to get a property by its id. */
    router.get("/property/:id", hasAuth, propertiesController.getPropertiesById);

    router.patch("/property/:id/sold", hasAuth, propertiesController.updatePropertyAsSold);

    router.patch("/property/:id", hasAuth, upload.single('image'), propertiesController.updatePropertyDetails);

    router.delete("/property/:id", hasAuth, propertiesController.deleteProperties);

    /* A middleware that is used to catch any errors that may occur in the application. */
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