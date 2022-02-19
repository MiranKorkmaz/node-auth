const User = require("../models/User");

// controller actions
module.exports.register_get = (req, res) => {
  res.render('Register');
}

module.exports.login_get = (req, res) => {
  res.render('Login');
}

module.exports.register_post = async (req, res) => {
  const {firstName, lastName, userName, password } = req.body
  try {
    const user = await User.create({firstName, lastName, userName, password})
    // successfull status
    res.status(201).json(user)
  } catch(err) {
    console.log(err)
    // error status
    res.status(400).send("User not created")
  }
}

module.exports.login_post = async (req, res) => {
  const { userName, password } = req.body
  console.log(userName, password)
  res.send('user login');
}