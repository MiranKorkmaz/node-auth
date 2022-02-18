const User = require("../models/User");

// controller actions
module.exports.register_get = (req, res) => {
  res.render('Register');
}

module.exports.login_get = (req, res) => {
  res.render('Login');
}

module.exports.register_post = async (req, res) => {
  const { firstName, lastName, userName, password } = req.body;
  const user = await User.create({ firstName, lastName, userName, password });
//   res.status(201).json(user);
}

module.exports.login_post = async (req, res) => {
  const { userName, password } = req.body;

  console.log(userName, password);
  res.send('user login');
}