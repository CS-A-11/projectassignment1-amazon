var mongoose = require("mongoose");
var ORDER = mongoose.model("order");
var PROC = mongoose.model("products");

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };

/* POST create product*/
module.exports.createOrder = function(req, res)
{
    if(req.body)
    {
        ORDER.create({
            _buyerUserid:req.body._buyerUserid,
            _sellerUserid:req.body._sellerUserid,
            total:req.body.total,
            completed:falseS
        }).exec(function(err,orderDetail){
            if(err)
            {
                sendJSONresponse(res, 400, err);            
            }
            else
            {
                sendJSONresponse(res, 200, { status: "success" });
            }
        });
    }
    else{
        sendJSONresponse(res, 404, {message: 'parameters are not provided'});
    }
}
/* POST create product ends*/

/*GET read order */
module.exports.ReadOneOrder = function(req, res)
{
    console.log("Finding order details", req.params);
    if (req.params && req.params.orderid) {
      ORDER.findById(req.params.Orderid).exec(function(err, order) {
        if (!order) {
          sendJSONresponse(res, 404, {
            message: "Orderid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(order);
        sendJSONresponse(res, 200, order);
      });
    } else {
      console.log("No Orderid specified");
      sendJSONresponse(res, 404, {
        message: "No Orderid in request"
      });
    }
}
/*GET read order ends*/

/* DELETE update orderdetail */
module.exports.deleteOrder = function(req, res)
{
    if(req.params && req.params.orderid)
    {
        ORDER.findByIdAndRemove(req.params.orderid).exec(function(err, order) {
            if (err) {
              console.log(err);
              sendJSONresponse(res, 404, err);
              return;
            }
            console.log("order id " + req.params.orderid + " deleted");
            sendJSONresponse(res, 204, null);
          });
        } 
        else {
          sendJSONresponse(res, 404, {
            message: "No orderid"
          });
        }
}
/* DELETE update orderdetail ends*/


