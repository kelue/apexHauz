const getAllProperties = `
SELECT * FROM properties
`;


const getPropertyById = `
SELECT * FROM properties WHERE id = ?
`;

const createNewProperty = `
INSERT INTO properties VALUES(null, ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , NOW(), NOW())
`;

const updatePropertyStatus = `
UPDATE properties SET status = ? WHERE id = ?
`;

const deleteProperty = `
DELETE FROM properties WHERE id = ?
`;


module.exports = {
    getAllProperties,
    getPropertyById,
    createNewProperty,
    updatePropertyStatus,
    deleteProperty
}