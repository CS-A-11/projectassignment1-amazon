var mongoose = require('mongoose');
var gracefulshutdown;
var dbURI = 'mongodb://localhost:27017/Amazon';
mongoose.connect(dbURI);

if (process.env.NODE_ENV === "production") {
    dbURI = "mongodb://omer077:ping3245@ds229474.mlab.com:29474/amazonproject";
  }

mongoose.connection.on('connected',function()
{
    console.log("Db is running on "+dbURI);
});
mongoose.connection.on('error',function(err){
    console.log(err);
});
mongoose.connection.on('disconnected',function(){
    console.log("Mongoose disconnected");
});

gracefulshutdown= function(msg, callback){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected');
        callback();
    });
};

process.once('SIGUSR2',function()
{
    gracefulshutdown('nodemon restart',function(){
        process.kill(process.pid,'SIGUSR2');
    });
});
process.on('SIGINT',function()
{
    gracefulshutdown('app termination',function(){
        process.exit(0);
    });
});
process.on('SIGTERM',function()
{
    gracefulshutdown('Heroku app shutdown',function(){
        process.exit(0);
    });
});

require('./user');
require('./products');
require('./order');
require('./complain');

module.exports = mongoose;

