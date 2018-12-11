var express = require('express');
var router = express.Router();
var UserCtrl = require('../controlers/user');
var ProcCtrl = require('../controlers/products');
var OrderCtrl = require('../controlers/order');
var ReviewCtrl = require('../controlers/review');
var OrderItemCtrl = require('../controlers/orderItem');



// /*User routes */
 router.post('/user/signin',UserCtrl.userSignIn);
 router.post('/user/signup',UserCtrl.userCreate);
// /*User routes ends */

// /* products routes */
router.get('/product', ProcCtrl.ReadAllProducts);
router.get('/product/:Productid',ProcCtrl.ProductsReadOne);
router.get('/product/:category',ProcCtrl.productsByCategory);
router.post('/product',ProcCtrl.createproduct);
router.put('/product',ProcCtrl.ProductssUpdateOne);
router.delete('/product',ProcCtrl.DeleteProduct);
// /*products routes ends */

// /*Review routes */
 router.get('/product/:Productid/review/:reviewid', ReviewCtrl.reviewlist);
 router.post('/product/:Productid/review', ReviewCtrl.CreateReview);
 router.put('/product/:Productid/review/:reviewid', ReviewCtrl.UpdateReview);
 router.delete('/product/:Productid/review/:reviewid', ReviewCtrl.DeleteReview);
// /*Review routes ends */

// /*Order routes */
 router.get('/order/:orderid',OrderCtrl.ReadOneOrder);
 router.post('/order', OrderCtrl.createOrder);
 /* single item order routes */
 router.post('/order/:orderid/items', OrderItemCtrl.addItem);
 router.put('/order/:orderid/items/:itemid',OrderItemCtrl.updateItem);
router.delete('/order/:orderid/items/:itemid',OrderItemCtrl.deleteItem);
 /*single item order routes ends */
 router.delete('/order', OrderCtrl.deleteOrder);
// /*Order routes ends*/

/* complain routes */
/* complain routes ends */


module.exports = router;
