const express = require("express");
const CookieParser = require('cookie-parser');
require('dotenv').config();

// API Endpoint Routes
const { AuthRoutes } = require("./src/routes/api/v2/auth.js");
const { CategoryRoutes } = require("./src/routes/api/v2/category.js");
const { PropertyRoutes } = require("./src/routes/api/v2/property.js");
const { UserRoutes } = require("./src/routes/api/v2/user.js");
const { UserPropertyRoute } = require("./src/routes/api/v2/user/property.js");
const { ReportRoutes } = require("./src/routes/api/v2/report.js");


const app = express();
const api = express();

app.use(CookieParser(process.env.COOKIE_SECRET_KEY));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to SideHustle Node REST API with express." });
});

app.use('/api/v2', api);

require("./src/routes/api/v1/usersRoutes.js")(app);
require("./src/routes/api/v1/propertiesRoutes.js")(app);

api.use('/auth', AuthRoutes);
api.use('/users', UserRoutes);
api.use('/properties', PropertyRoutes);
api.use('/categories', CategoryRoutes);
api.use('/user', UserPropertyRoute);
api.use('/reports', ReportRoutes);

app.use((err, req, res, next) => {
    /* This is a middleware that is used to catch any errors that may occur in the application. */
    res.status(err.statusCode ?? 500).send({
        status: 'error',
        message: err.message,
    });
    next();
});

// set port, listen for requests
const PORT = process.env.SERVER_PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});