//All routes will be imported here and exported to the main index.js file on the root so that the index file is lean
//Route definitions will be done here
const route = require("express").Router();
const expressJwt = require("express-jwt");

//Custom controller imports
const singup = require("../controllers/signup/signup");
const login = require("../controllers/authentication/authentication");
const resetPassword = require("../controllers/authentication/resetPassword");

route.post("/signup", singup);
route.post("/login", login);
route.use("/reset-password", resetPassword);
route.post(
    "/logout",
    expressJwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }),
    (req, res) => {
        res.json({ data: req.user });
    }
);

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
