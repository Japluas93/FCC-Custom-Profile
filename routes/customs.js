var express = require('express');
var router  = express.Router();

var customs_controller = require('../controllers/customs_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");

router.get('/profile', isAuthenticated, customs_controller.profile);

router.post('/new', isAuthenticated, customs_controller.createProfile);

module.exports = router;