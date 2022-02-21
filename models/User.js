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

// static method to login user
// from the mongo database
userSchema.statics.login = async function(userName, password) {
    const user = await this.findOne({userName})
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user 
        }
        throw Error("Incorrect password")
    }
    throw Error("Incorrect username")
}

const User = mongoose.model("user", userSchema)

module.exports = User

