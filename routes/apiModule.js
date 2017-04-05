module.exports = function(app,driver,model){
	var express = require('express');
	var router = express.Router();

	//controller file
	var scraperController = require('../controller/scraperController')(app,driver,model);

	router.get('/list/prd',scraperController.paytmScraper);

	return router;
}