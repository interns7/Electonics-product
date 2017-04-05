module.exports = function(app,driver,model){
	return cronModule = {
		productUpdate : function(req,res){
			var productCron = driver.getModule('productCron');
			var options = {};
			productCron.update(options,function(data){
				res.success({'result':data,'massage':'Crowling of product!'});
			},res.failure,driver,model)
		}
	};
}