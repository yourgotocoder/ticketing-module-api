const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () =>
    console.log(`REST server for Ticketing Module started on port: ${PORT}`)
);
