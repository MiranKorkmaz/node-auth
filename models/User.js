const mongoose = require("mongoose")

const userSchema = new mongoose.Schema ({
    userName: {
        type: String, 
        required: [true, "Please enter a username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum password length is 6 character"]
    },
    firstName: {
        type: String,
        maxlength: 50,
        required: [true, "Please enter a firstname"],
    },
    lastName: {
        type: String,
        maxlength: 50,
        required: [true, "Please enter a lastname"],
    }
})

const User = mongoose.model("user", userSchema)

module.exports = User

