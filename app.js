const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()
const port = 3000

// serving static files 
app.use(express.static("public"))

// connect app to mongoose 
mongoose.connect("mongodb://localhost/users", {
}).then(console.log("mongoDB connected")).catch(err => console.log(err))

// import User model
const User = require("./models/User")

// BodyParser middlewear 
app.use(bodyParser. urlencoded({extended: true}))

// Parse application/json
app.use(bodyParser.json())

// set template engine 
app.set("view engine", "ejs")

// route for login page
app.get("/login", (req,res) => {
    res.render("Login")
})

// route for registration page 
app.get("/register", (req,res) => {
    res.render("Register")
})

app.listen(port, () => {
    console.log(`Port started on ${port}`)
})