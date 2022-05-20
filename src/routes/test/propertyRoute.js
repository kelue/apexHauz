const router = require("express").Router();
const { upload } = require("../../utils/multer");

/* Importing the userController.js file. */
const propertiesController = require('../../controllers/propertiesController');



/* This is a route that is used to get all the properties. */
router.get("/", propertiesController.getAllProperties);

/* This is a route that is used to create a new property. */
router.post("/", upload.single('image'), propertiesController.createProperties);

/* This is a route that is used to get a property by its id. */
router.get("/:id", propertiesController.getPropertiesById);

module.exports = router;