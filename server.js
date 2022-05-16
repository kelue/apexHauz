const express = require("express");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to SideHustle Node REST API with express." });
});

app.use('/properties', require('./src/routes/test/propertyRoute'));

/* This part of the code was giving errors, so I commented it out, try using the method above for your routes */
/* require("./src/routes/api/v1/usersRoutes.js")(app);

require("./src/routes/api/v1/propertiesRoutes.js")(app); */

app.use((err, req, res, next) => {
    /* This is a middleware that is used to catch any errors that may occur in the application. */
    res.status(err.statusCode || 500).send({
        message: err.message
    });
    next();
});

// set port, listen for requests
const PORT = process.env.SERVER_PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});