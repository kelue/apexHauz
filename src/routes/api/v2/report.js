const router = require('express').Router();

const { createReport, getAllReports, getReportById, updateReportById, deleteReportById } = require('../../../controllers/ReportController');
const AuthMiddleware = require('../../../middleware/AuthMiddleware');

router.post('/', AuthMiddleware, createReport);
router.get('/', getAllReports);
router.get('/:id', getReportById);
router.patch('/:id', AuthMiddleware, updateReportById);
router.delete('/:id', AuthMiddleware, deleteReportById);

module.exports = {
    ReportRoutes: router,
}