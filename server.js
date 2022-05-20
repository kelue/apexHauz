const express = require("express");


const app = express();

const fileUpload = require('express-fileupload');


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/* A middleware that allows you to parse the multipart/form-data. */
app.use(fileUpload());

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to SideHustle Node REST API with express." });
});


require("./src/routes/api/v1/usersRoutes.js")(app);

require("./src/routes/api/v1/propertiesRoutes.js")(app);

// set port, listen for requests
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});