var express    		= require('express');
var bodyParser 		= require('body-parser');
var path       		= require('path');
var http       		= require('http');
var baseModel 		= require('./model/baseModel');
var app = express();

//configuration
app.set('port',process.env.PORT || 3000);

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//custom middleware for success and failure responses
app.use(function(req,res,next){
	res.header("Content-Type",'text/json');
	res.success = function(obj){
		if(!obj.status)
			obj.status = true;

		res.status(200).end(JSON.stringify(obj));
	}
	res.failure = function(msg,e){
		if(!msg) msg = 'Some Error Occured';
		var internal_massage;
		if(e){
			console.log(e.massage);
			internal_massage = e.massage;
		}
		res.status(500).end(JSON.stringify({'status':false,'massage':msg,'internal_massage':internal_massage}));
	}
	next();
})

//error handler
app.use(function(err,req,res,next){
	console.log(err);
	res.failure('Something Broke!',err);
})

//config setup
var driver = require(__dirname+'/public/javascript/driver')(app);

//load model collections;
var model = baseModel.setup();

//routes setup
require('./routes/module.js')(app,driver,model);

http.createServer(app).listen(app.get('port'),function(){
	console.log('app is running on port '+app.get('port'));
})

