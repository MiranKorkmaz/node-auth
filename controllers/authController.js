const User = require("../models/User");
const jwt = require("jsonwebtoken")

// a function for handling errors
const handleErrors = (err) => {
  console.log(err.message, err.code)
  let errors = { userName: "", password: ""}

    // duplicate email error
    if (err.code === 11000) {
      errors.userName = 'that username is already registered';
      return errors;
    }
  
  // error message for unique username
  if (err.code === 11000) {
    errors.userName = "That username is already registered"
    return errors
  }

  // Validaton error
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message
    })
  }
  return errors
}

// max age for token, 30 days
const maxAgeToken = 30 * 24 * 60 * 60 
// create token
// id comes from user in mongoDB
const createToken = (id) => {
  // pass in payload which is ID
  return jwt.sign({
    data: id, 
  }, 'secret', { expiresIn: '1h' });
}

// controller actions
module.exports.register_get = (req, res) => {
  res.render('Register');
}

module.exports.login_get = (req, res) => {
  res.render('Login');
}

module.exports.register_post = async (req, res) => {
  const { userName, password } = req.body

  try {
    const user = await User.create({ userName, password})
    const token = createToken(user._id)
    res.cookie("jwt", token, {maxAgeToken: maxAgeToken})
    // successfull status
    res.status(201).json({user: user._id})
  } catch(err) {
    // returning handleErrors function
    const errors = handleErrors(err)
    // error status 
    // sending errors as well
    res.status(400).json({ errors })
  }
}

module.exports.login_post = async (req, res) => {
  const { userName, password } = req.body

  try {
    const user = await User.login(userName, password)
    res.status(200).json({user: user._id})
  } catch (err) {
    res.status(400).json({})
  }
}