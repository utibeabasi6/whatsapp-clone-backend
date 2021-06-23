const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    message: String
})

const Chat = mongoose.Model(chatSchema)