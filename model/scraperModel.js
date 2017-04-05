var Db 			= require('mongodb').Db;
var Connection  = require('mongodb').Connection;
var Server		= require('mongodb').Server;
var BSON 		= require('mongodb').BSON;
var ObjectId 	= require('mongodb').ObjectId;

ScraperModel = function(host,port){
	this.db = new Db('scraper', new Server(host, port, { safe:true, auto_reconnect: true }, {}));
    this.db.open(function () { });
};

ScraperModel.prototype.getCollectionSafe = function (callback) {
    this.db.collection('product', { safe: true }, function (error, product) {
        if (error) callback(error);
        else callback(null, product);
    });
};

ScraperModel.prototype.getCollection = function (callback) {
    this.db.collection('product', function (error, product) {
        if (error) callback(error);
        else callback(null, product);
    });
};

ScraperModel.prototype.findAll = function (callback) {
    this.getCollection(function (error, product) {
        if (error) callback(error)
        else {
            product.find({},{_id:false}).toArray(function (error, results) {
                if (error) callback(error)
                else callback(null, results)
            });
        }
    });
};
ScraperModel.prototype.updateAll = function (list,callback) {
        var _this = this;
        _this.db.collection("product1").insert(list,function(err,data){
            if(err){
                callback(err);
                return;
            }
            _this.db.collection("product").drop(function(err,deleteData){
                if(err){
                    callback(err);
                    return;
                }
                _this.db.collection("product1").rename("product",function(err1,rename){
                    if(err1){
                        callback(err1);
                        return;
                    }
                    callback(null,"product is successfully updated");
                })
            })
        })
};

module.exports.ScraperModel = ScraperModel;