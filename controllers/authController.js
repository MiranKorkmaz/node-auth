const User = require("../models/User");


// controller actions
module.exports.register_get = (req, res) => {
  res.render('Register');
}

module.exports.login_get = (req, res) => {
  res.render('Login');
}

module.exports.register_post = async (req, res) => {
  const {firstName, lastName, userName, password} = req.body
  try {
    User.create({})
  }
  catch (err) {

  }
}

module.exports.login_post = async (req, res) => {
  const { userName, password } = req.body
  console.log(userName, password)
  res.send('user login');
}