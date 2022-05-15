const fs = require('fs/promises');

const router = require('express').Router();
const cloudinary = require('../src/utils/cloudinary');
const multer = require('../src/utils/multer');

router.post('/image-upload', multer.single('image'), async (req, res) => {
    const uploadedImage = await cloudinary.upload(req.file.path);
    fs.unlink(req.file.path);
    res.send(uploadedImage);
})

router.delete('/image', async (req, res) => {
    try {
        cloudinary.delete(req.body.image_id);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }
})

module.exports = router;
