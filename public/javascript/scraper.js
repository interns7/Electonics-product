scraper = function(){

};

scraper.prototype.find = function(options,success,failure,driver,model){
	model.scraperModel.findAll(function (error, docs) {
        var data = 0;
        if (error == null) {
            success(docs);
        }
        else {
            failure(error);
        }
    });
};

module.exports.scraper = scraper;