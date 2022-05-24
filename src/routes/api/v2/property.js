const router = require('express').Router();

const AuthMiddleware = require('../../../middleware/AuthMiddleware');
const { createProperty, getAllProperties, getPropertyById, updatePropertyById, deletePropertyById, getPropertyUser, getPropertyCategory } = require('../../../controllers/PropertyController');

router.post('/', AuthMiddleware, createProperty);
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.patch('/:id', AuthMiddleware, updatePropertyById);
router.delete('/:id', AuthMiddleware, deletePropertyById);
router.get('/:id/user', getPropertyUser);
router.get('/:id/category', getPropertyCategory);

module.exports = {
    PropertyRoutes: router,
};