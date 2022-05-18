const cloudinary = require('cloudinary').v2;
require('dotenv').config()

/* It's configuring the cloudinary API. */
cloudinary.config({
    /* It's getting the cloud name from the .env file. */
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    /* It's getting the API key from the .env file. */
    api_key: process.env.CLOUDINARY_API_KEY,
    /* It's getting the API secret from the .env file. */
    api_secret: process.env.CLOUDINARY_API_SECRET,
    /* It's making sure that the API is secure. */
    secure: true
});


/* It's a wrapper for the cloudinary API */
class Cloudinary {
    /**
     * It takes an image and a callback function as parameters, uploads the image to Cloudinary, and
     * then calls the callback function with the result of the upload.
     * 
     * The callback function is a function that is passed as a parameter to another function and is
     * called inside that function.
     * 
     * The callback function is called with two parameters: error and result. If there is an error, the
     * error parameter will contain the error object, and the result parameter will be null. If there
     * is no error, the error parameter will be null, and the result parameter will contain the result
     * object.
     * 
     * The result object contains the image URL, image ID, and other information about the image.
     * 
     * The UploadImage function is called in the PostImage function.
     * @param image - The image to upload.
     * @param callback - The callback function that will be called when the upload is complete.
     */
    static UploadImage(image, callback) {
        /* It's uploading the image to Cloudinary. */
        cloudinary.uploader.upload(image, (error, result) => {
            /* It's calling the callback function with the error or result. */
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }
    /**
     * It deletes an image from Cloudinary
     * @param public_id - The public ID of the image you want to delete.
     * @param callback - A callback function that will be called when the upload is complete.
     */
    static DeleteImage(public_id, callback) {
        /* It's deleting an image from Cloudinary. */
        cloudinary.uploader.destroy(public_id, (error, result) => {
            /* It's calling the callback function with the error or result. */
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    /** 
     * 
     * @author Ahmad Busari
     * @param {Array} An array of the uploaded files object from multer (req.files).
     * @returns {Array} An array of objects for each image containing the secure_url and public_id properties as url and id respectively.
     * @description This method takes in an array of files from multer, maps them into another array of objects containing the url and id to the uploaded files which can the be saved into the database.
     * 
    */
    static async UploadMultipleImages(images) {
        try {
            const links = images.map(async (image) => {
                const uploadedImage = await cloudinary.uploader.upload(image.path);
                fs.unlink(image.path);
                const newImage = { url: uploadedImage.secure_url, id: uploadedImage.public_id };

                return newImage;
            });
            return await Promise.all(links);
        } catch (error) {
            console.log(error);
        }

    }


}


/* It's exporting the Cloudinary class so that it can be used in other files. */
module.exports = Cloudinary;