require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")
const app = express()
const port = 3000
const login = require("./controllers/authController")


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

app.post("/login", login.login_post)


app.use(authRoutes)

app.listen(port, () => {
    console.log(`Port started on ${port}`)
})