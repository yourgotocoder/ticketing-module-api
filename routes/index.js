//All routes will be imported here and exported to the main index.js file on the root so that the index file is lean
//Route definitions will be done here
const route = require("express").Router();

//Custom controller imports
const singup = require("../controllers/signup/signup");
const login = require("../controllers/authentication/authentication");

route.post("/signup", singup);
route.post("/login", login);
route.post("/logout");

//Startup code, hello world
route.get("", (req, res) => {
    res.json({
        error: false,
        message: "Hello from the api",
        data: null,
    });
});

//Handling all non-existent routes
route.get("*", (req, res) => {
    res.json({
        error: true,
        message: "Error, non-existent route",
        data: null,
    });
});

module.exports = route;
