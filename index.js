const express = require("express");
const cors = require("cors");
require("dotenv").config();

//Custom imports
const mongoConnector = require("./db/connector");

const app = express();

//Middlewares
app.use(cors());

const PORT = process.env.PORT;

mongoConnector(
    process.env.MONGO_DB_USER_NAME,
    process.env.MONGO_DB_PASSWORD,
    () => {
        app.listen(PORT, () =>
            console.log(
                `REST server for Ticketing Module started on port: ${PORT}`
            )
        );
    }
);
