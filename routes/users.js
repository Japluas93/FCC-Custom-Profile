var express = require('express');
var router  = express.Router();

// var passport = require("../config/passport");
const users_controller = require('../controllers/users_controller');
// var isAuthenticated = require("../config/middleware/isAuthenticated");


router.get('/registration', users_controller.registrationPage);

// router.get('/sign-out', users_controller.signOutUser);

// router.post('/login', passport.authenticate("local"), users_controller.loginUser);

// router.post('/signup', users_controller.signUpUser);

module.exports = router;

//github sucks