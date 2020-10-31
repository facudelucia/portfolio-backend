const {Schema, model} = require("mongoose");

const SchemaUser = Schema({
    email: String,
    password: String
})

module.exports = model("User", SchemaUser);