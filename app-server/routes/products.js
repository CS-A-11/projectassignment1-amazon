var express = require('express');
var router = express.Router();
var productsCtrl=require('../controlers/products');

/* GET home page. */
router.get('/', productsCtrl.productsList);

module.exports = router;
