var express = require('express');
var router  = express.Router();

var customs_controller = require('../controllers/customs_controller');

router.get('/', customs_controller.index);

router.post('/new', customs_controller.createProfile);

module.exports = router;