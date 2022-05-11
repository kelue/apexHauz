// IMPORTING EXPRESS INTO THE APPLICATION
const express = require("express");

/* 
Cross-Origin Resource Sharing
CORS WOULD ALSO BE USE Access-Control-Request-Method 
WITH THIS METHODS:GET, HEAD, PUT, PATCH, POST, DELETE
*/
const cors = require("cors");

// ASSIGING express to app
const app = express();

// parse request of using cors
app.use(cors());

// parse requests of content-type -application/json
app.use(express.json());

// parse requests of content-type -application/ x- www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/* this below line of code would be use when we create routes page for users :

  require("./src/routes/user.routes")(app);

*/

// Simple Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to SideHustle SECOND capsion project OF APEXHAUZ",
  });
});

//Set Port, Listen for requests
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}.`);
});
=======
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


require("./routes/api/v1/usersRoutes.js")(app);

// set port, listen for requests
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});

