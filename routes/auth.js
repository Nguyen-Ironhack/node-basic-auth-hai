const router = require("express").Router();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');

// signup
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

// the signup form posts to this route
router.post('/signup', (req, res) => {
  // get username and password
  const { username, password } = req.body;
  console.log(username, password);
  // is the password longer than 8 chars and the username not empty
  if (password.length < 8) {
    // if not show the signup again with a message
    res.render('signup', { message: 'Your password must be 8 chars min' });
  }
  if (username === '') {
    res.render('signup', { message: 'Your username cannot be empty' });
  }
  // check if the username already exists
  User.findOne({ username: username })
    .then(userFromDB => {
      if (userFromDB !== null) {
        // if yes show the signup again with a message
        res.render('signup', { message: 'Username is already taken' });
      } else {
        // all validation passed - > we can create a new user in the database with a hashed password
        // create salt and hash
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt)
        // create the user in the db
        User.create({ username: username, password: hash })
          .then(userFromDB => {
            console.log(userFromDB);
            // then redirect to login
            res.redirect('/');
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;