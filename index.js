const express = require("express");
const cors = require("cors");
require("dotenv").config();

//Custom imports
const mongoConnector = require("./db/connector");

const app = express();

//Middlewares
app.use(cors());

//Custom middlewares
const mainRouter = require("./routes/index");

//Main route handler
app.use("", mainRouter);
const PORT = process.env.PORT;

mongoConnector(
    process.env.MONGO_DB_USER_NAME,
    process.env.MONGO_DB_PASSWORD,
    app.listen(PORT)
)
    .then(() =>
        console.log(`Server for Ticketing Module started on port: ${PORT}`)
    )
    .catch((err) => console.log(err));
