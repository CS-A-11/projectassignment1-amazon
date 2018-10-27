var express = require('express');
var router = express.Router();
var loginCtrl=require('../controlers/login');

/* GET home page. */
router.get('/', loginCtrl.login);

module.exports = router;
