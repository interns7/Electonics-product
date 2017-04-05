module.exports = function(app,driver,model){
	return scraperModule = {
		paytmScraper : function(req,res){
			var scraper = driver.getModule('scraper');
			var options = {};
			scraper.find(options,function(data){
				res.success({'result':data,'massage':'All electronics product using api!'});
			},res.failure,driver,model)
		}
	};
}