const mongoose = require("mongoose")
const subscriberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscribedToChannel: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
})

module.exports = mongoose.model("subscriber", subscriberSchema)