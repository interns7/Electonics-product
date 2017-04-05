module.exports = function(app,driver,model){
	app.use('/api',require('./apiModule')(app,driver,model));
	app.use('/cron',require('./cronModule')(app,driver,model));
}