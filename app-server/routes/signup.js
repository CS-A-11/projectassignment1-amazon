var express = require('express');
var router = express.Router();
var signupCtrl=require('../controlers/signup');

/* GET home page. */
router.get('/', signupCtrl.signup );

module.exports = router;
