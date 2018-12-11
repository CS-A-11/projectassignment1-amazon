var mongoose = require('mongoose');

var complainSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    orderid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'order'
    },
    summary: {type:String, required:true,
        validation: {
            viladotr: function (text) {
                return text.lenght>50;
            }
        }
    },
    createdOn:{
        type:Date,
        default: Date.now
    },
    resolved:{
        type:Boolean,
        default:false,
        required:true
    }
});

var COMPLAIN = mongoose.model('complain', complainSchema );
module.exports = COMPLAIN;