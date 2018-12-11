var request = require("request");
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === "production") {
  apiOptions.server = "https://loc8r-session.herokuapp.com";
}
/* Generic function for Error */
var _showError = function(req, res, status) {
    var title, content;
    if (status === 404) {
      title = "404, page not found";
      content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else if (status === 500) {
      title = "500, internal server error";
      content = "How embarrassing. There's a problem with our server.";
    } else {
      title = status + ", something's gone wrong";
      content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render("generic-text", {
      title: title,
      content: content
    });
  };
/* Generic function for Error Ends */

/*get product*/
var renderDetailpage = function(req, res, procData)
{
    res.render('Product-list',
       { products:procData}
    );
};
var getProductInfofromDatabase =function(req, res, CallBack)
{
    var requestOptions, path;
    path = '/api/product/' + req.params.ProductId;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    }
    request(requestOptions, function(error, res, body){
        if(res.statusCode === 200)
        {
            CallBack(req, res, body);
        }else
        {
            _showError(req, res, res.statusCode);
        }
    });
}
module.exports.productInfo = function (req, res) {
    getProductInfofromDatabase(req, res, function(req, res, responseData){
        renderDetailpage(req, res, responseDatas);
    });
}
/* get product ends */



/* GET products by category*/
var GetProductsfromdatabase =function(req, res, CallBack)
{
    var requestOptions, path;
    path = '/api/product/' + req.params.category;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    }
    request(requestOptions, function(error, res, body){
        if(res.statusCode === 200)
        {
            CallBack(req, res, body);
        }else
        {
            _showError(req, res, res.statusCode);
        }
    });
}
var renderAllproductscategorypage =function(req, res, procData)
{
    res.render('product-by-category',{ title: req.category,
        products:procData});
}
module.exports.productsBycategory = function(req, res)
{
    GetProductsfromdatabase(req, res, function(req, res, products)
    {
        renderAllproductscategorypage(req, res, products);
    });
}
/* GET  products by category ends */



/*GET all products */
var GetAllProductsfromdatabase =function(req, res, CallBack)
{
    var requestOptions, path;
    path = '/api/product' 
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    }
    request(requestOptions, function(error, res, body){
        if(res.statusCode === 200)
        {
            CallBack(req, res, body);
        }else
        {
            _showError(req, res, res.statusCode);
        }
    });
}
var renderAllproductspage =function(req, res, procData)
{
    res.render('product-by-category',{ title: req.category,
        products:procData});
}
module.exports.Allproducts = function(req, res)
{
    GetAllProductsfromdatabase(req, res, function(req, res, products)
    {
        renderAllproductspage(req, res, products);
    });
}
/*GET all products ends */



/* post create a product */
var CreateProductInDatabase = function(req, res, CallBack)
{
    var requestOptions, path;
    path = apiOptions.server + '/api/product'
    requestOptions = {
        url: apiOptions + Path,
        method: "POST",
        json: {}
    }
    request(requestOption, function(error, res, body){
        var data=body;
        if(res.statusCode === 200)
        {
            CallBack(req, res, data);
        }
        else
        {
            _showError(req, res, res.statusCode);
        }
    });
};
var RenderProductCreatedPage = function(req, res, responseData)
{
    res.render('single-product-info',
        {product:responseData }
    );
}
module.exports.createProduct = function(req, res)
{
    CreateProductInDatabase(req, res, function(req, res, productData)
    {
        RenderProductCreatedPage(req, res, productData);
    });
}
/* post create a product ends */



/* PUT update product info */
var UpdateProductInDatabase = function(req, res, CallBack)
{
    var requestOptions, path;
    path = apiOptions.server + '/api/product'
    requestOptions = {
        url: apiOptions + Path,
        method: "PUT",
        json: {}
    }
    request(requestOption, function(error, res, body){
        var data=body;
        if(res.statusCode === 200)
        {
            CallBack(req, res, data);
        }
        else
        {
            _showError(req, res, res.statusCode);
        }
    });
}
module.exports.updateProduct = function(req, res)
{
    UpdateProductInDatabase(req, res, function(req, res, ProductData){
        RenderProductCreatedPage(req, res, responseData);
    });
}

/* PUT update product info ends */



/* DELETE product */
var DeleteProductFromDatabase = function(req, res, CallBack)
{
    var requestOptions, path;
    path = apiOptions.server + '/api/product';
    requestOptions = {
        url: apiOptions + Path,
        method: "DELETE",
        json: {}
    }
    request(requestOption, function(error, res, body){
        var data=body;
        if(res.statusCode === 200)
        {
            CallBack(req, res, data);
        }
        else
        {
            _showError(req, res, res.statusCode);
        }
    });
}
module.exports.DeleteProduct = function(req, res)
{
    DeleteProductFromDatabase(req, res, function(res, req, responseData)
    {
        res.render('Delete-proc', null);
    });

}
/* DELETE product ends */

var renderReviewForm = function(req, res, locDetail) {
    res.render("product-review-form", {
      title: "Review " + productDetail.name + " on Amazon",
      pageHeader: { title: "Review " + productDetail.name },
      review: {},
  
      error: req.query.err
    });
  };

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
    getProductInfofromDatabase(req, res, function(req, res, responseData) {
      renderReviewForm(req, res, responseData);
    });
};


/* POST 'Add review' page */
module.exports.doAddReview = function(req, res) {
    var requestOptions, path, productid, postdata;
    productid = req.params.productid;
    path = "/api/product/" + locationid + "/review";
    postdata = {
      author: req.body.name,
      rating: parseInt(req.body.rating, 10),
      reviewText: req.body.review,
      userId: req.session.userId
    };
    requestOptions = {
      url: apiOptions.server + path,
      method: "POST",
      json: postdata
    };
    if (!postdata.author || !postdata.rating || !postdata.reviewText) {
      res.redirect("/product/" + locationid + "/review/new?err=val");
    } else {
      request(requestOptions, function(err, response, body) {
        if (response.statusCode === 201) {
          res.redirect("/product/" + productid);
        } else if (
          response.statusCode === 400 &&
          body.name &&
          body.name === "ValidationError"
        ) {
          res.redirect("/product/" + locationid + "/review/new?err=val");
        } else {
          console.log(body);
          _showError(req, res, response.statusCode);
        }
      });
    }
  };

  var getReviewInfo = function(req, res, callback) {
    var requestOptions, path;
    path =
      "/api/product/" +
      req.params.productid +
      "/review/" +
      req.params.reviewid;
    requestOptions = {
      url: apiOptions.server + path,
      method: "GET",
      json: {}
    };
    request(requestOptions, function(err, response, body) {
      var data = body;
      if (response.statusCode === 200) {
        callback(req, res, data);
      } else {
        _showError(req, res, response.statusCode);
      }
    });
  };

  var renderEditReviewForm = function(req, res, reviewDetail) {
    res.render("product-review-edit-form", {
      title: "Review " + reviewDetail.product.name + " on Amazon",
      pageHeader: { title: "Review " + reviewDetail.product.name },
      author: reviewDetail.review.author,
      rating: reviewDetail.review.rating,
      reviewText: reviewDetail.review.reviewText,
      error: req.query.err
    });
  };
  /* GET 'Edit review' page */
module.exports.editReview = function(req, res) {
    getReviewInfo(req, res, function(req, res, responseData) {
      renderEditReviewForm(req, res, responseData);
    });
  };

  /* PUT 'Edit review' page */
module.exports.doEditReview = function(req, res) {
    var requestOptions, path, productid, reviewid, postdata;
    productid = req.params.productid;
    reviewid = req.params.reviewid;
    path = "/api/product/" + productid + "/review/" + reviewid;
    postdata = {
      author: req.body.name,
      rating: parseInt(req.body.rating, 10),
      reviewText: req.body.review
    };
    requestOptions = {
      url: apiOptions.server + path,
      method: "PUT",
      json: postdata
    };
    if (!postdata.author || !postdata.rating || !postdata.reviewText) {
      res.redirect("/product/" + productid + "/review/new?err=val");
    } else {
      request(requestOptions, function(err, response, body) {
        if (response.statusCode === 200) {
          res.redirect("/product/" + productid);
        } else if (
          response.statusCode === 400 &&
          body.name &&
          body.name === "ValidationError"
        ) {
          res.redirect("/product/" + locationid + "/review/new?err=val");
        } else {
          console.log(body);
          _showError(req, res, response.statusCode);
        }
      });
    }
  };

  /* GET 'Delete review' page */
module.exports.deleteReview = function(req, res) {
    var requestOptions, path, productid, reviewid;
    productid = req.params.productid;
    reviewid = req.params.reviewid;
    path = "/api/product/" + productid + "/review/" + reviewid;
  
    requestOptions = {
      url: apiOptions.server + path,
      method: "DELETE",
      json: {}
    };
    request(requestOptions, function(err, response) {
        if (response.statusCode === 204) {
          res.redirect("/product/" + productid);
        } else if (response.statusCode === 400) {
          res.redirect("/product/" + productid + "/reviews/new?err=val");
        } else {
          //console.log(body);
          _showError(req, res, response.statusCode);
        }
      });
    };