var express = require('express');
var app = express();
app.use(express.static('public'));

app.set('view engine','ejs');
app.set('views','./views');
app.use('/scripts',express.static(__dirname+'/node_modules/web3.js-browser/build/'));

const PORT = process.env.PORT || 5000;
var server = require('http').Server(app);
server.listen(PORT,function(){
    console.log("Server is running...");
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

// Mongoose 
const mongoose = require('mongoose');
mongoose.connect('<link connect mongodb>',function(err){
    if (err){
        console.log('err: ',err);
    }else{
        console.log('server mongo connected success');
    }
});

require('./controllers/name.controller')(app);