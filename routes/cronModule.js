module.exports = function(app,driver,model){
	var express = require('express');
	var router = express.Router();

	//controller file
	var scraperCron = require('../cron/scraperCron')(app,driver,model);

	router.get('/update/prd',scraperCron.productUpdate);

	return router;
}