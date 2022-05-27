const createError = require("http-errors");

const Report = require("../models/Report")

const createReport = async (req, res) => {
    const reporter = req.user;
    try {
        const report = await reporter.createReport(req.body);
        res.status(201).json({
            status: 'success',
            data: report,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const getAllReports = async (req, res) => {
    try {
        const reports = await Report.findAll({
            include: [{
                association: 'property'
            },
            {
                association: 'reporter',
                attributes: {
                    exclude: ['password', 'phone', 'address', 'email', 'created_at', 'updated_at'],
                },
            }]
        })

        res.status(200).json({
            status: 'success',
            data: reports,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const getReportById = async (req, res) => {
    const id = req.params.id;
    try {
        const report = await Report.findByPk(id, {
            include: [
                {
                    association: 'property'
                },
                {
                    association: 'reporter',
                    attributes: {
                        exclude: ['password', 'phone', 'address', 'email', 'created_at', 'updated_at'],
                    },
                }
            ]
        })
        if (!report) throw new createError(404, 'Report not found!');
        res.status(200).json({
            status: 'succes',
            data: report,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const updateReportById = async (req, res) => {
    const reporter = req.user;
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = Report.fillables;
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    try {
        if (!isValidOperation) throw new createError(400, 'Bad request!');

        const report = await Report.findByPk(id);
        if (!report) throw new createError(404, 'Report not found');

        const isValidUserReport = reporter.is_admin ? true : await reporter.hasReport(report);
        if (!isValidUserReport) throw new createError(403, 'Forbidden!');

        const data = req.body;
        report.set(data);
        const newReport = await report.save();
        res.status(200).json({
            status: 'success',
            data: newReport,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const deleteReportById = async (req, res) => {
    const reporter = req.user;
    const id = req.params.id;

    try {
        const report = await Report.findByPk(id);
        if (!report) throw new createError(404, 'Report not found!');

        const isValidUserReport = reporter.is_admin ? true : await reporter.hasReport(report);
        if (!isValidUserReport) throw new createError(403, 'Forbidden!');

        await report.destroy();
        res.status(200).json({
            status: 'success',
            data: report,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

module.exports = {
    createReport,
    getAllReports,
    getReportById,
    updateReportById,
    deleteReportById,
}