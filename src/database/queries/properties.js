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

const getPropertyByCategoryName = `
SELECT * FROM properties WHERE category_id = (SELECT id FROM categories WHERE name = ?)
`;

const updatePropertyDetails = `
UPDATE properties SET category_id = ?, price = ?, state = ?, city = ?, address = ?, description = ?, status = ?, image_url = ?, image_id = ?, updated_at = NOW() WHERE id = ?
`;



module.exports = {
    getAllProperties,
    getPropertyById,
    createNewProperty,
    updatePropertyStatus,
    deleteProperty,
    getPropertyByCategoryName,
    updatePropertyDetails
}