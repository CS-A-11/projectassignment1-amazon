var mongoose = require( 'mongoose' );

var productsSchema=new mongoose.Schema({
	name:String,
    ProcId:{type:Number,"default":0},
    rating:{type:Number,"default":0,min:0,max:5},
	prize:Number
});