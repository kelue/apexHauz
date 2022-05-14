const getAllProperties = `
SELECT * FROM properties
`;


const getPropertyById = `
SELECT * FROM properties WHERE id = ?
`;

const createNewProperty = `
INSERT INTO properties VALUES(null, ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , NOW(), NOW())
`;


module.exports = {
    getAllProperties,
    getPropertyById,
    createNewProperty
}