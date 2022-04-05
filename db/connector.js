//A connector function for mongodb
const mongoose = require("mongoose");

async function mongoDBConnector(dbUserName, dbPassword, callbackFn) {
    try {
        const result = await mongoose.connect(
            `mongodb+srv://${dbUserName}:${dbPassword}@mongodb-graphql.qg7ft.mongodb.net/ticketing-module?retryWrites=true&w=majority`
        );
        result
            ? console.log("Connected successfully to mongo database")
            : new Error(`Error connecting to database`);
        return callbackFn;
    } catch (err) {
        console.log(err);
    }
}

module.exports = mongoDBConnector;
