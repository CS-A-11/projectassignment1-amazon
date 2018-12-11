/* POST add order item */
module.exports.addItem = function (req, res) {
    if(req.params && req.params.orderid)
    {
        PROC.findById(req.params.orderid)
        .select('items')
        .exec(function(err, order){
            if(err) {
                sendJSONresponse(res, 404, err);
                return;
            }
            else {
                if(!order)
                {
                    sendJSONresponse(res, 404,{ message:'product not found'});
                    return;
                }
                else{
                    order.items.push({
                        _id:req.body.Productid,
                        quantity:req.body.quantity
                    });
                    order.save(function(err, order){
                        if(err)
                        {
                            sendJSONresponse(res, 400, err);
                            return;
                        }
                        else {
                            var thisitem = order.items[order.items - 1];
                            sendJSONresponse(res, 200, thisitem);
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
}
/* POST add order item ends*/

/* PUT update item */
module.exports.updateItem = function(req, res)
{
    console.log('finding review' + req.params.orderid);
    if(req.params && req.params.orderid && req.params.itemid)
    {
        PROC.findById(req.params.orderid)
        .select('reviews')
        .exec(function(err,order){
            if (!order) {
                sendJSONresponse(res, 404,
                  {message: "orderid not found"
                });
                return;
            } 
            else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            if(order.items && order.items.lenght > 0)
            {
                if(!order.items.id(req.params.itemid))
                {
                    sendJSONresponse(res, 404, 
                       { message:'item not found'});
                }
                else{
                    var item = order.items.id(req.params.itemid);
                    item.quantity = req.body.quantity;
                    order.save(function(err, order)
                    {
                        if(err)
                        {
                            sendJSONresponse(res, 400, err);
                            return;
                        }
                        else{
                            updateReviewRating(order._id);
                            sendJSONresponse(res, 200, item);
                        }
                    });
                }
            }

        });
    }
    else
    {
        sendJSONresponse(res, 404, {message:'Both orderid and itemid required'});
    }
}
/* PUT update item ends */

/* DELETE delete item*/
module.exports.deleteItem = function(req, res)
{
    if(req.params && req.params.orderid && req.params.itemid)
    {
        PROC.findById(req.params.orderid)
        .select('reviews')
        .exec(function(err,order){
            if (!order) {
                sendJSONresponse(res, 404, 
                  {message: "orderid not found"
                });
                return;
            } 
            else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            if(order.items && order.items.lenght > 0)
            {
                if(!order.items.id(req.params.itemid))
                {
                    sendJSONresponse(res, 404, 
                        {message:'item not found'});
                }
                else{
                    order.items.id(req.params.itemid).remove();
                    order.save(function(err, order)
                    {
                        if(err){
                            sendJSONresponse(res, 400, err);
                        }
                        else{
                            sendJSONresponse(res, 200, order);
                        }
                    });
                }
            }

        });
    }
    else
    {
        sendJSONresponse(res, 404, {message:'Both orderid and itemid required'});
    }
}
/* DELETE delete item ends*/
