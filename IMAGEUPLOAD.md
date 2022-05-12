# HOW TO UPLOAD IMAGE USING MULTER AND CLOUDINARY

    const fs = require("fs");
    
    const router = require("express").Router();
    
    const cloudinary = require("../src/utils/cloudinary");
    const upload = require("../src/utils/multer");
    const Property = require("../src/models/property");
    
    // Uploading image to cloud when creating a property
    router.post("/properties", upload.single("image"), async(req, res) => {
     try {
      // Upload image to cloudinary
      const result = await cloudinary.upload(req.file.path);
      
      // Create new property
      const property = new Property({
       ...req.body,
       image_url: result.secure_url,
       image_id: result.public_id,
      });

      // You can decide to delete the temporary image stored on the server using
      fs.unlink(req.file.path);

      // Save property details in db
      await property.save();
      res.status(200).send({
        property,
      });
     } catch (err) {
      console.log(err);
     }
    });

NOTE: The 'image' string argument passed to `upload.single()` is the name of the uploaded image **field**. Change it to suit yours.

    // Deleting image from cloud when deleting a property
    router.delete("/properties/:id", async (req, res) => {
     try {
      // Find property by id
      const property = await Property.findById(req.params.id);
      
      // Delete image from cloudinary
      await cloudinary.delete(property.image_id);
      
      // Delete property from db
      await property.remove();
      res.json(property);
     } catch (err) {
      console.log(err);
     }
    });

    // Updating image in the cloud when updating a property
    router.put("/properties/:id", upload.single("image"), async (req, res) => {
     try {
      const property = await Property.findById(req.params.id);
      
      // Delete image from cloudinary
      await cloudinary.delete(property.image_id);
      
      // Upload new image to cloudinary
      const result = await cloudinary.upload(req.file.path);
      const data = {
       name: req.body.name || property.name,
       ...,
       image_url: result.secure_url || poperty.image_url,
       image_id: result.public_id || property.image_id,
      };
      updatedProperty = await Property.findByIdAndUpdate(req.params.id, data, {
       new: true
      });
      res.json(updatedProperty);
     } catch (err) {
      console.log(err);
     }
    });
    
    module.exports = router;
