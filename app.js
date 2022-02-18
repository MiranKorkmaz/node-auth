const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const port = 3000

// BodyParser middlewear 
app.use(bodyParser. urlencoded({extended: true}))

// Parse application/json
app.use(bodyParser.json())

// set template engine 
app.set("view engine", "ejs")


// route for root page
app.get("/", (req,res) => {
    res.render("Login")
})

app.listen(port, () => {
    console.log(`Port started on ${port}`)
})