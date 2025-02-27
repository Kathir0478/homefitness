const mongoose = require('mongoose')

const userData = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number },
    gender: { typpe: String }
})

module.exports = mongoose.model('User', userData)