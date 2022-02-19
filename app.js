require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")
const app = express()
const port = 3000
app.use(cors())

// serving static files middleware
app.use(express.static("public"))
app.use(express.json())

// connect app to mongoose 
mongoose.connect("mongodb://localhost/users", {
}).then(console.log("mongoDB connected")).catch(err => console.log(err))

// import User model
const User = require("./models/User")

// BodyParser middlewear 
// Parse application/json
app.use(bodyParser. urlencoded({extended: true}))
app.use(bodyParser.json())

// set template engine 
app.set("view engine", "ejs")

// using auth router such as login and registration
app.use(authRoutes)

// route for profile page 
app.get("/profile", (req, res) => {
    res.render("Profile")
})

app.get("/", (req, res) => {
    res.send("hiiiii")
})

app.use("User", require("./routes/authRoutes"))


app.listen(port, () => {
    console.log(`Port started on ${port}`)
})