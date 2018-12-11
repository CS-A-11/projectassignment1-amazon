var express = require('express');
var router = express.Router();
var indexCtrl= require('../controlers/index');
var UserCtrl= require('../controlers/User');
var productsCtrl=require('../controlers/products');


/* GET home page. */
router.get('/', indexCtrl.index);
router.get('/about', indexCtrl.about);


/*User routes */
//router.get('/',);
router.get('/signin', UserCtrl.signin);
router.get('/signup', UserCtrl.signup);
router.post('/signin',UserCtrl.Dosignin);
router.post('/signup',UserCtrl.Dosignup);
/*User routes ends */

/* products routes */
router.get('/product', productsCtrl.Allproducts);
router.get('/product/:id',productsCtrl.productInfo);
router.get('/product/:category', productsCtrl.productsBycategory);
router.post('/product',productsCtrl.createProduct);
router.put('/product',productsCtrl.updateProduct);
router.delete('/product', productsCtrl.DeleteProduct);
//router.get('/searching',);
/*products routes ends */

// /*Review routes */

router.get("/product/:productid/review/new", indexCtrl.checkLogin, productsCtrl.addReview);
  router.post("/product/:productid/review/new", productsCtrl.doAddReview);
  router.get("/product/:productid/review/:reviewid/edit",productsCtrl.editReview);
  router.post("/product/:productid/review/:reviewid/edit", productsCtrl.doEditReview);
  router.get("/product/:productid/review/:reviewid/delete",productsCtrl.deleteReview);
/*Review routes ends */

// /*Order routes */
// router.get('/order/:orderid',OrderCtrl.ReadOneOrder);
// router.post('/order', OrderCtrl.createOrder);
// /* single item order routes */
// router.post('/order/:orderid/items', OrderItemCtrl.addItem);
// router.put('/order/:orderid/items/:itemid',OrderItemCtrl.updateItem);
// router.delete('/order/:orderid/items/:itemid',OrderItemCtrl.deleteItem);
// /*single item order routes ends */
// router.delete('/order', OrderCtrl.deleteOrder);
// /*Order routes ends*/

/* Complain routes */
/* Complain routes ends */

module.exports = router;
