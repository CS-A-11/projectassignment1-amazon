var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/Amazon';
mongoose.connect(dbURI);

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

var gracefulshutdown= function(msg, callback){
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

var products= require('./products');