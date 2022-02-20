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

// creating a mongoose hook to fire a function after a new user has been saved to database 
// post (after) saving --> fire function 
userSchema.post("save", function (doc, next) {
    console.log("new user created and saved", doc)
    next()
})

const User = mongoose.model("user", userSchema)

module.exports = User

