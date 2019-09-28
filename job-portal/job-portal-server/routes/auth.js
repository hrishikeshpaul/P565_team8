var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/user')

router.post('/register', function (req, res) {

  console.log(req.body)
  var password = req.body.password1;
  var password2 = req.body.password2;

  if (password === password2) {
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password1
    });

    User.createUser(newUser, function (err, user) {
      if (err) throw err;
      res.send(user).end()
    });
  } else {
    res.status(500).send("{errors: \"Passwords don't match\"}").end()
  }
});

// Endpoint to login
router.post('/login', function (req, res, next) {
  // Print the user here
  return passport.authenticate('local', (err, user, info) => {
    console.log(JSON.stringify(user))
    res.send(user)
  })
});

// Endpoint to get current user
router.get('/user', function (req, res) {
  res.send(req.user);
})


// Endpoint to logout
router.get('/logout', function (req, res) {
  req.logout();
  res.send(null)
});

module.exports = router;
