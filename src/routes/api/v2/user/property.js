const router = require('express').Router();

const { markAsSold } = require('../../../../controllers/PropertyController');
const { getUserProperties } = require('../../../../controllers/UserController');
const AuthMiddleware = require('../../../../middleware/AuthMiddleware');

router.get('/properties', AuthMiddleware, getUserProperties);
router.patch('/properties/:id/sold', AuthMiddleware, markAsSold);

module.exports = {
    UserPropertyRoute: router
}