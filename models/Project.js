const {Schema, model} = require("mongoose");

const SchemaProject = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    github: { type: String, required: true },
    image: { type: String, required: true }
})

module.exports = model("Project", SchemaProject);