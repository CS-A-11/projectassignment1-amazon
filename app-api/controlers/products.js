var mongoose = require("mongoose");
var PROC = mongoose.model("products");
var fs=require('fs');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };
  /* Get All Products */
  module.exports.ReadAllProducts = function(req, res)
  {
    if(true)
    {
        PROC.find()
        .select("_id name prize images ")
        .exec(function(err, procs){
            if(procs.lenght == 0)
            {
                var message= 'No product added yet';
                sendJSONresponse(res, 400, message);
                return;
            }
            else if(procs)
            {
                sendJSONresponse(res, 200, procs);
                return;
            }
            else if(err)
            {
                sendJSONresponse(res, 400, err);
            }
        });
    }
  };

  /* GET a Product by the id */
module.exports.ProductsReadOne = function(req, res) {
    console.log("Finding Product details", req.params);
    if (req.params && req.params.Productid) {
      PROC.findById(req.params.Productid).exec(function(err, Product) {
        if (!Product) {
          sendJSONresponse(res, 404, {
            message: "Productid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(Product);
        sendJSONresponse(res, 200, Product);
      });
    } else {
      console.log("No Productid specified");
      sendJSONresponse(res, 404, {
        message: "No Productid in request"
      });
    }
  };

/* Get products by category */
module.exports.productsByCategory = function(re, res)
{
    if(req.params && req.params.category)
    {
        PROC.find(category)
        .select("_id name prize image")
        .exec(function(err,products)
        {
            if(err)
            {
                sendJSONresponse(res, 400, err);
                return;
            }
            else if(!products)
            {
                sendJSONresponse(res, 404, {
                    message:"products not found"
                });
                return;
            }
            else{
                sendJSONresponse(res, 200, products);
            }
        });
    }
    else{
        sendJSONresponse(res, 404, {message: "category required"});
    }
}

/* POST Products uploaded by seller */
module.exports.createproduct = function(req, res){
    PROC.create({
            name:req.body.name,
            prize:req.body.prize,
            description:req.body.description,
            quantity:req.body.quantity,
            category:req.body.category,

            tags:req.body.tags,
            images:req.body.images

        },function(err , product)
        {
            if (error) {
                sendJSONresponse(res, 400, err);
            } 
            else {
                sendJSONresponse(res, 200, { status: "success" });
            }
    });
};
/* PUT  */
module.exports.ProductssUpdateOne = function(req, res) {
    if (!req.params.Productid) {
      sendJSONresponse(res, 404, {
        message: "Not found, Productid is required"
      });
      return;
    }
    PROC.findById(req.params.Productid)
      .select("-reviews -rating")
      .exec(function(err, Product) {
        if (!Product) {
          sendJSONresponse(res, 404, {
            message: "Productid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        Product.name = req.body.name;
        Product.prize = req.body.prize;
        Product.description = req.body.description;
        Product.quantity = req.body.quantity;
        Product.category = req.body.category;
        Product.tags=req.body.tags;
        Product.images=req.body.images;

        location.save(function(err, location) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, location);
          }
        });
      });
  };

/* DELETE Product deleted by seller */
module.exports.DeleteProduct = function(req, res){
    var Productid = req.params.Productid;
    if (Productid) {
        PROC.findByIdAndRemove(Productid).exec(function(err, Product) {
        if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log("Product id " + Productid + " deleted");
        sendJSONresponse(res, 204, null);
      });
    } else {
      sendJSONresponse(res, 404, {
        message: "No Productid"
      });
    }
};