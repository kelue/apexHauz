const express = require("express");
const CookieParser = require('cookie-parser');
require('dotenv').config();

// API Endpoint Routes
const { AuthRoutes } = require("./src/routes/api/v2/auth.js");
const { CategoryRoutes } = require("./src/routes/api/v2/category.js");
const { PropertyRoutes } = require("./src/routes/api/v2/property.js");
const { UserRoutes } = require("./src/routes/api/v2/user.js");
const { UserPropertyRoute } = require("./src/routes/api/v2/user/property.js");


const app = express();

app.use(CookieParser(process.env.COOKIE_SECRET_KEY));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to SideHustle Node REST API with express." });
});


require("./src/routes/api/v1/usersRoutes.js")(app);

require("./src/routes/api/v1/propertiesRoutes.js")(app);

app.use('/api/v2/auth', AuthRoutes);
app.use('/api/v2/users', UserRoutes);
app.use('/api/v2/properties', PropertyRoutes);
app.use('/api/v2/categories', CategoryRoutes);
app.use('/api/v2/user', UserPropertyRoute);

// set port, listen for requests
const PORT = process.env.SERVER_PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});