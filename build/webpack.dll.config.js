/**
 * Created by Administrator on 2017/1/22.
 */
const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
var ROOT_CONFIG = require('./root.config');
module.exports = {
	entry: {
		vendor: ROOT_CONFIG.DEV_JS_MODULE
	},
	output: {
		path: ROOT_CONFIG.SRC_PATH,
		filename: '[name].[hash].js',
		library: '[name]_library'
	},
	plugins: [
		new webpack.DllPlugin({
			context: '.',
			path:ROOT_CONFIG.ROOT_PATH+"/build/dll/[name]-manifest.json",
			name: '[name]_library'
		}),
		new AssetsPlugin({
			path:ROOT_CONFIG.ROOT_PATH+"/build/dll",
			filename: 'bundle-config.json'
		}),
	]
};