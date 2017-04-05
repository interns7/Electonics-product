module.exports = function(app){
	var _this = {
		getModule : function(module){
			var Module = require(__dirname+'/'+module)[module];
			var module = new Module();
			return module;
		}
	};
	return _this;
}