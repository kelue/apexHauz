const router = require('express').Router();

const { signUpUser, signInUser, signOutUser } = require('../../../controllers/AuthController');

router.post('/register', signUpUser);
router.post('/login', signInUser);
router.post('/logout', signOutUser);

module.exports = {
    AuthRoutes: router,
};