const router = require('express').Router();

const { signUpUser, signInUser, signOutUser, sendUserResetPasswordMail, resetUserPassword } = require('../../../controllers/AuthController');

router.post('/register', signUpUser);
router.post('/login', signInUser);
router.post('/logout', signOutUser);
router.post('/reset-password', sendUserResetPasswordMail);
router.patch('/reset-password', resetUserPassword);

module.exports = {
    AuthRoutes: router,
};