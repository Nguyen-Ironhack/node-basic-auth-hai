const router = require("express").Router();

// Signup
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

// the signup form posts to this route
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  // is the password longer than 8 chars and the username not empty
  if (password.length < 8 || password.length === 0) {
    // if not show the signup again with a message
    res.render("signup", {message: 'Your password must be 8 chars min'});
  }

  // check if the username already exists
  if (username === '') {
    res.render("signup", {message: 'Your username can not be empty'});
  }
  // if yes show the signup again with a message
  // all validation passed - > we create a new user in the database with a hashed password
  // then redirect to login
});

module.exports = router;