const router = require('express').Router();

const AuthMiddleware = require('../../../middleware/AuthMiddleware');
const AdminMiddleware = require('../../../middleware/AdminMiddleware');
const { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById, getCategoryPropertiesBySlug } = require('../../../controllers/CategoryController');

router.post('/', AuthMiddleware, AdminMiddleware, createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.patch('/:id', AuthMiddleware, AdminMiddleware, updateCategoryById);
router.delete('/:id', AuthMiddleware, AdminMiddleware, deleteCategoryById);
router.get('/:slug/properties', getCategoryPropertiesBySlug);
module.exports = {
    CategoryRoutes: router,
};