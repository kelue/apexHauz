const path = require('path');
const crypto = require('crypto');

const multer = require('multer');


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/temp'); // specifies the storage location for the uploaded file/image
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // extracts the file extension
        const name = Date.now().toString() + '_' + crypto.randomBytes(8).toString('hex') + ext; // generates a new file name from the current timestamp, a random string plus the original file extension to
        cb(null, name);
    }
});

const upload = multer({
    storage: fileStorage,
    limits: {
        fileSize: 1000000, // max filesize in bytes
    },
    fileFilter(req, file, cb) {
        // checks if the uploaded file is a valid image
        if (!file?.mimetype.match(/(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a valid image!'), false);
        }
        cb(null, true);
    },
});

module.exports = {
    upload
}
