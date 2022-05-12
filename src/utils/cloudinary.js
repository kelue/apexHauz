const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * 
 * @author Ahmad Busari
 * @param {String} image The path to the image
 * @returns {Object} The uploaded Image Object containing some properties like the url and id of the image in Cloudinary storage
 * @description This function takes an image and uploads the image to Cloudinary storage
 * @copyright MIT
 *  
 * */

const uploadImageToCloudinary = async (image) => {
    try {
        const uploadedImage = await cloudinary.uploader.upload(image);
        return uploadedImage;
    } catch (error) {
        throw new Error('Image upload to cloud failed!');
    }
}

/**
 * 
 * @author Ahmad Busari
 * @param {String} image_id The property's image_id field
 * @returns {void}
 * @description This function takes the property's image_id and use it to delete the image from Cloudinary storage
 * @copyright MIT
 *  
 * */
const deleteImageFromCloudinary = async (image_id) => {
    try {
        await cloudinary.uploader.destroy(image_id);
    } catch (error) {
        throw new Error('Image deletion from cloud failed!');
    }
}

module.exports = {
    upload: uploadImageToCloudinary,
    delete: deleteImageFromCloudinary,
};