const mongoose = require("mongoose")

const userSchema = new mongoose.Schema ({
    userName: {
        type: String, 
        unique: true, 
        required: [true, "Please enter a username"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
})

const User = mongoose.model("user", userSchema)

module.exports = mongoose.model("User", userSchema)