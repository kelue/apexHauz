const cloudinary = require('cloudinary').v2;
require('dotenv').config();

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

const uploadImageToCloudinary = (image) => {
    return cloudinary.uploader.upload(image)
}
/* const uploadImageToCloudinary = (image) => {
    cloudinary.uploader.upload(image, (err, uploadedImage) => {
        if (err) {
            throw err;
        }
        console.log(uploadedImage);
        return uploadedImage;
    });
} */

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
        console.log(error);
        //throw new Error('Image deletion from cloud failed!');
    }
}

module.exports = {
    upload: uploadImageToCloudinary,
    delete: deleteImageFromCloudinary,
};