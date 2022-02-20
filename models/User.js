const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const express = require("express")

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
// pre saving --> fire function 
// hash password so it doesnt show in mongodb database
// a salt is a random string
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

const User = mongoose.model("user", userSchema)

module.exports = User

