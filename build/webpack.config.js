var glob = require('glob');
var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
var webpackConfig,compiler;
module.exports = function (app, debug) {
	if(debug){
		webpackConfig = require('./webpack.dev');
		var entries = {};
		var entriesFile = glob.sync(path.resolve(__dirname, '../assets/src/**/*.entry.js'));
		for (var i = 0, len = entriesFile.length; i < len; i++) {
			var filePath = entriesFile[i];
			var key = filePath.substring(filePath.lastIndexOf('/') + 1,filePath.lastIndexOf('.'));
			entries[key] = [hotMiddlewareScript, path.resolve(__dirname,filePath)];
		}
		_.merge(webpackConfig.entry, entries);
		compiler = webpack(webpackConfig);
		app.use(webpackMiddleware(compiler, {
			contentBase: webpackConfig.output.path,
			publicPath: webpackConfig.output.publicPath,
			stats: {colors: true},
			hot: true,
			noInfo: true
		}));
		app.use(webpackHotMiddleware(compiler, {
			log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
		}));
	}else {
		webpackConfig = require("./webpack.prod");
		compiler = webpack(webpackConfig);
		function callback(err, stats) {
			if (err) {
				console.log(err);
			} else {
				console.log(stats.toString({
					colors: true,
					chunks: false,
					children: false,
				}));
			}
		}
		compiler.run(callback);
	}
};
