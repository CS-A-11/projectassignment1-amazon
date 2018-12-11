var mongoose = require( 'mongoose' );

var reviewSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviewText: String,
    createdOn: { type: Date, default: Date.now }
});

var productsSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String, required:true},
    prize:{
        type:Number, 
        required:true,
        validate:{ 
            validator : function (pri) {
                return pri>0;
            }
        }
    },
    description:{ type:String, required:true},
    quantity:{type:Number, required:true},
    category:{type:String, required:true},

    images:[{type:String, required:true}],
    tags:[String],
    rating:{type:Number,"default":0, min:0, max:5},
    reviews:[reviewSchema]
});

var PROC = mongoose.model('products', productsSchema);
module.exports = PROC;