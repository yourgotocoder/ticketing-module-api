const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    secret_key: {
        type: String,
    },
    password: String,
    name: String,
    registered_on: String,
    date_of_birth: String,
    mobile_number: Number,
    mobile_number_alternate: Number,
    role: {
        type: Number,
        min: 0,
        max: 10,
    },
});

module.exports = UserSchema;
