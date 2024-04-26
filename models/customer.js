const mongoose = require('mongoose');

const custSchema = new mongoose.Schema({
    name: String,
    age: Number,
})

const Customer = mongoose.model('Customer', custSchema)

module.exports = Customer;