var mongoose = require('mongoose');
var PROC = mongoose.model('products');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };

var updateReviewRating = function(productid)
{
    PROC.findById(productid)
    .select("reviews, rating")
    .exec(function(err, product)
    {
        if(err)
        {
            sendJSONresponse(res, 400, err);
            return;
        } else if(!product) {
            sendJSONresponse(res, 404, { message:'Product not found' });
            return;
        }
        else{
            if(!product.reviews && !( products.reviews.lenght > 0))
            {
                sendJSONresponse(res, 404, {message:'No review found'});
                return;
            }
            else{
                var sum = 0; 
                products.reviews.forEach(review => {
                    sum=sum+review.rating;
                });
                var answer = sum/products.reviews.lenght;
                product.rating = answer;
                product.save(function(err, product)
                {
                    if(err)
                    {
                        sendJSONresponse(res, 400, err);
                        return;
                    }
                    else
                    {
                        sendJSONresponse(res, 200, product);
                    }
                });
            }
        }
    });
}

/*GET single review */
module.exports.reviewlist = function (req, res) {
    console.log('finding review' + req.params.reviewid);
    if(req.params && req.params.productid && req.params.reviewid)
    {
        PROC.findById(req.params.productid)
        .select('reviews')
        .exec(function(err,product){
            if (!Product) {
                sendJSONresponse(res, 404, {
                  message: "Productid not found"
                });
                return;
            } 
            else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            if(product.reviews && product.reviews.lenght > 0)
            {
                if(!product.reviews.id(req.params.reviewid))
                {
                    sendJSONresponse(res, 404, 
                        {message:'review not found'});
                }
                else{
                    var review = product.reviews.id(req.params.reviewid);
                    sendJSONresponse(res, 200, review);
                }
            }

        });
    }
    else
    {
        sendJSONresponse(res, 404,{ message:'Both productid and reviewid required'});
    }
}
/*GET singles review end*/

/* POST create review */
module.exports.CreateReview = function(req, res)
{
    if(req.params && req.params.productid)
    {
        PROC.findById(req.params.productid)
        .select('reviews')
        .exec(function(err, product){
            if(err) {
                sendJSONresponse(res, 404, err);
                return;
            }
            else {
                if(!product)
                {
                    sendJSONresponse(res, 404,{ message:'product not found'});
                    return;
                }
                else{
                    product.reviews.push({
                        author: req.body.author,
                        rating: req.body.rating,
                        reviewText: req.body.reviewText,
                        createdOn: req.body.date,
                        userId: String
                    });
                    product.save(function(err, product){
                        if(err)
                        {
                            sendJSONresponse(res, 400, err);
                            return;
                        }
                        else {
                            updateReviewRating(location._id);
                            var thisreview = product.reviews[product.reviews - 1];
                            sendJSONresponse(res, 200, thisreview);
                        }
                    });
                }
            }
        });
    }
    else
    {
        sendJSONresponse(res, 404, {message: 'Productid required'});
    }
};
/* POST create review ends */

/* PUT update a review */
module.exports.UpdateReview = function(req, res)
{
    console.log('finding review' + req.params.reviewid);
    if(req.params && req.params.productid && req.params.reviewid)
    {
        PROC.findById(req.params.productid)
        .select('reviews')
        .exec(function(err,product){
            if (!Product) {
                sendJSONresponse(res, 404,
                  {message: "Productid not found"
                });
                return;
            } 
            else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            if(product.reviews && product.reviews.lenght > 0)
            {
                if(!product.reviews.id(req.params.reviewid))
                {
                    sendJSONresponse(res, 404, 
                       { message:'review not found'});
                }
                else{
                    var review = product.reviews.id(req.params.reviewid);
                    review. rating = req.body.rating;
                    review.reviewText = req.body.reviewText;
                    product.save(function(err, product)
                    {
                        if(err)
                        {
                            sendJSONresponse(res, 400, err);
                            return;
                        }
                        else{
                            updateReviewRating(product._id);
                            sendJSONresponse(res, 200, review);
                        }
                    });
                }
            }

        });
    }
    else
    {
        sendJSONresponse(res, 404, {message:'Both productid and reviewid required'});
    }
}
/* PUT update a review ends*/

/* DELETE delete a review */
module.exports.DeleteReview = function(req, res)
{
    if(req.params && req.params.productid && req.params.reviewid)
    {
        PROC.findById(req.params.productid)
        .select('reviews')
        .exec(function(err,product){
            if (!Product) {
                sendJSONresponse(res, 404, 
                  {message: "Productid not found"
                });
                return;
            } 
            else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            if(product.reviews && product.reviews.lenght > 0)
            {
                if(!product.reviews.id(req.params.reviewid))
                {
                    sendJSONresponse(res, 404, 
                        {message:'review not found'});
                }
                else{
                    product.reviews.id(req.params.reviewid).remove();
                    product.save(function(err, product)
                    {
                        if(err){
                            sendJSONresponse(res, 400, err);
                        }
                        else{
                            sendJSONresponse(res, 200, product);
                        }
                    });
                }
            }

        });
    }
    else
    {
        sendJSONresponse(res, 404, {message:'Both productid and reviewid required'});
    }
}
/* DELETE delete a review ends*/



