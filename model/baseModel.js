
var modelMappings = [
	'scraperModel'
];

module.exports.setup = function(){
	var modelObj = {};
	modelMappings.map(function(model){
		modelObj[model] = new(require('./'+model)[model.charAt(0).toUpperCase()+model.slice(1)])('localhost',27017);
	})

	return modelObj;
}