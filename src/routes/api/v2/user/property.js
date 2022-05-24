const router = require('express').Router();

const { getUserProperties } = require('../../../../controllers/UserController');
const AuthMiddleware = require('../../../../middleware/AuthMiddleware');

router.get('/properties', AuthMiddleware, getUserProperties);

module.exports = {
    UserPropertyRoute: router
}