const cloudinary = require('cloudinary').v2;
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

class Cloudinary {
    static UploadImage(image, callback) {
        cloudinary.uploader.upload(image, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
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
const deleteImageFromCloudinary = async(image_id) => {
    try {
        await cloudinary.uploader.destroy(image_id);
    } catch (error) {
        throw new Error('Image deletion from cloud failed!');
    }
}

module.exports = Cloudinary;