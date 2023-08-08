const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    account: String,
    title: String,
    description: String,
    Author: String,
    Priorty: String
})

module.exports = mongoose.model("Todo", todoSchema)