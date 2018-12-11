var mongoose = require( 'mongoose' );

var itemSchema = new mongoose.Schema({
    _Id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'products'
    },
    quantity:{type:Number, required:true,
        validate: {
            validator : function (quan) {
                return quan>0;
            }
        }
    }
});


var orderSchema =new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    _buyerUserid: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    _sellerUserid: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    total:Number,
    completed:{type:Boolean, required:true},
    items:[itemSchema]
});

var ORDER = mongoose.model('order', orderSchema);
module.exports = ORDER;