const router = require("express").Router();

const userController = require('../../../controllers/usersController');
const { hasAuth } = require('../../../middleware/hasAuth')

module.exports = app => {
    // Create a new User
    router.post("/register", userController.createUser);

    // Login User
    router.post("/login", userController.loginUser);

    // Retrieve all Users
    router.get("/", userController.findAll);

    // Retrieve a single User with id
    // router.get("/:id", userController.findOne);

    // // Update a User with id
    // router.put("/:id", userController.update);

    // // Delete a User with id
    // router.delete("/:id", userController.delete);

    app.use('/api/v1', router);

    // error handler
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    });
};