const router = require('express').Router();


const AuthMiddleware = require('../../../middleware/AuthMiddleware');
const { createProperty, getAllProperties, getPropertyById, updatePropertyById, deletePropertyById, getPropertyUser, getPropertyCategory, getPropertyBySearchQuery, getPropertyReports } = require('../../../controllers/PropertyController');
const { upload } = require('../../../utils/multer');

router.post('/', AuthMiddleware, upload.array('images', 3), createProperty);
router.get('/', getAllProperties);
router.get('/search', getPropertyBySearchQuery);
router.get('/:id', getPropertyById);
router.patch('/:id', AuthMiddleware, updatePropertyById);
router.delete('/:id', AuthMiddleware, deletePropertyById);
router.get('/:id/user', getPropertyUser);
router.get('/:id/category', getPropertyCategory);
router.get('/:id/reports', getPropertyReports);

module.exports = {
    PropertyRoutes: router,
};