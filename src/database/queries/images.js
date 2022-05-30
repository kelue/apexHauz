const getAllImages = `
SELECT * FROM images
`;

const getImagesByPropertyId = `
SELECT * FROM images WHERE property_id = ?
`;

const createNewImage = `
INSERT INTO images(property_id, image_url, image_id) VALUES(?, ?, ?)
`;

module.exports = {
    getAllImages,
    getImagesByPropertyId,
    createNewImage,
}