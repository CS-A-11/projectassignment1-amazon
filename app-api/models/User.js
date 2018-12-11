var mongoose = require( 'mongoose');
var bcrypt = require('bcrypt');

var userschema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{
        type:String, 
        required:true,
        validate: {
            validator: function(text) {
                return text.lenght>=6;
            }
        }
    },
    phoneNumber:{
        type:String,
        validate: {
            validator: function(text) {
                return text.lenght === 11;
            }
        }
    },
    address:String,
    userType:{
        type: String,
        enum: ['Buyyer', 'Seller']
    },
    profilePicture:String
});

//authenticate input against database
userschema.statics.authenticate = function(email, password, callback) {
    User.findOne({ email: email }).exec(function(err, user) {
      if (err) {
        Console.log("error in authenticate");
        return callback(err);
      } else if (!user) {
        var err = new Error("User not found.");
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function(err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback(err);
        }
      });
    });
  };
  
  //hashing a password before saving it to the database
  userschema.pre("save", function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
  

var User=mongoose.model('User', userschema);
module.exports = User;
