const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const multer = require("multer")
const authRoutes = require("./routes/authRoutes")
const app = express()
const port = 3000

// serving static files middlewar
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

// using auth router
app.use(authRoutes)

// route for profile page 
app.get("/profile", (req, res) => {
    res.render("Profile")
})

app.listen(port, () => {
    console.log(`Port started on ${port}`)
})