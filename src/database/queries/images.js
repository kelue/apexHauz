const getAllImages = `
SELECT * FROM images
`;

const getExtraPropertyImages = `
SELECT * FROM images WHERE property_id = ?
`;

const addExtraPropertyImages = `
INSERT INTO images(property_id, image_url, image_id) VALUES(?, ?, ?)
`;

module.exports = {
    getAllImages,
    getExtraPropertyImages,
    addExtraPropertyImages,
}