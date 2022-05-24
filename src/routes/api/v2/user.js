const router = require('express').Router();

const AuthMiddleware = require('../../../middleware/AuthMiddleware');
const AdminMiddleware = require('../../../middleware/AdminMiddleware');
const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById, getUserProperties } = require('../../../controllers/UserController');

router.post('/', AuthMiddleware, AdminMiddleware, createUser);
router.get('/', AuthMiddleware, AdminMiddleware, getAllUsers);
router.get('/:id', AuthMiddleware, AdminMiddleware, getUserById);
router.patch('/:id', AuthMiddleware, AdminMiddleware, updateUserById);
router.delete('/:id', AuthMiddleware, AdminMiddleware, deleteUserById);

module.exports = {
    UserRoutes: router,
}