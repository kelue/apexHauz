const express = require("express");

const imageRouter = require('./test/imageUpload');

const app = express();




// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to SideHustle Node REST API with express." });
});

app.use('/', imageRouter);

// require("./routes/api/v1/usersRoutes.js")(app);

// set port, listen for requests
const PORT = process.env.SERVER_PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});