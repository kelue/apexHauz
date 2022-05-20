const getReportById = `
SELECT * FROM reports WHERE id = ?
`;

const createNewReport = `
INSERT INTO reports VALUES(null, ? , ? , ? , ? , NOW(), NOW())
`;

const getAllReports = `
SELECT * FROM reports
`;


module.exports = {
    getReportById,
    createNewReport,
    getAllReports
}