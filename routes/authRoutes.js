const { Router } = require("express")
const authController = require("../controllers/authController")

// creating new instance of router
const router = Router()


// route for registration page 
router.get("/register", authController.register_get)
router.post("/register", authController.register_post)
router.get("/login", authController.login_get)
router.get("/login", authController.login_post)

module.exports = router