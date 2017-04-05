var request   =    require('request');
var fs 		  =    require("fs");
var cheerio   =    require('cheerio');
var request   =    require("request");

productCron = function(){

};

productCron.prototype.update = function(options,success,failure,driver,model){
	var result_data = [];
	var url = "https://paytm.com/shop/h/electronics";
	request(url,function(err,response,body){
		if(err){
			failure("Something went wrong!");
			return;
		}

		var data = body.toString();
		$ = cheerio.load(data);
		var list = [];
		$('div._2NDQ').find(
			'div.mainContainer._2pgX._1_uk > div._3Dmy > div > div > div._3sJ6 > div.IANV'
			).each(function (index, element) {
			  $(element).find('div._2EKu > div._2TUX > a > div._343G').each(function(index,element){
			  	var cashback = $(element).find('span.wnaE').text();
			  	var name = $(element).find('div._2mza').text();
			  	var mrp = $(element).find('span._11Dh > span._3ZIv').text();
			  	var obj = {
			  		name : name,
			  		cashback : cashback,
			  		mrp : mrp
			  	};
			  	list.push(obj);
			  });
			});

			model.scraperModel.updateAll(list,function(err,docs){
		    	if(err){
		    		failure(err);
		    		return;
		    	}
		    	success(docs);
		    })
	})
};

module.exports.productCron = productCron;