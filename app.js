require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")
const app = express()
const port = 3000


// using middlewear
app.use(express.static("public"))
app.use(express.json())
app.use(cors())
app.use(cookieParser())
// BodyParser middlewear 
// Parse application/json
app.use(bodyParser. urlencoded({extended: true}))
app.use(bodyParser.json())

// connect app to mongoose 
mongoose.connect("mongodb://localhost/users", {
}).then(console.log("mongoDB connected")).catch(err => console.log(err))

// import User model
const User = require("./models/User")

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

app.get("/set-cookies", (req, res) => {
    res.cookie("kaknamn", false)
    // expiration date: 30 days
    res.cookie("isKaka", true, {maxAge: 1000 * 60 * 60 * 24 * 30 })
    res.send("I am a cookie 🍪")
})

app.get("/read-cookies", (req, res) => {
    const cookies = req.cookies
    console.log(cookies)
    res.json(cookies.newUser)
})








app.use("User", require("./routes/authRoutes"))


app.listen(port, () => {
    console.log(`Port started on ${port}`)
})