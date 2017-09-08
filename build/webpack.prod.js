"use strict";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var rucksackCss = require('rucksack-css');
var px2rem = require('postcss-pxtorem');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let px2remOpts = {
	rootValue: 100,
	propWhiteList: [],
};
var _    = require('lodash');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var ROOT_CONFIG = require('./root.config');

// 辅助函数
const utils = require('./utils');

//根据传入的正则寻找相对应的路径对象
const pickFiles = utils.pickFiles;


//公共模块路径映射:降低 require 路径查找的时间
var alias;
alias = pickFiles({
	id: /(conf\/[^\/]+).js$/,
	pattern: ROOT_CONFIG.SRC_PATH + '/conf/*.js'
});

alias = Object.assign(alias, pickFiles({
	id: /(components\/[^\/]+)/,
	pattern: ROOT_CONFIG.SRC_PATH + '/components/*/index.js'
}));

// reducers
// import reducers from 'reducers/index';

alias = Object.assign(alias, pickFiles({
	id: /(reducers\/[^\/]+).js/,
	pattern: ROOT_CONFIG.SRC_PATH + '/redux/reducers/*'
}));

// actions
// import actions from 'actions/index';

alias = Object.assign(alias, pickFiles({
	id: /(actions\/[^\/]+).js/,
	pattern: ROOT_CONFIG.SRC_PATH + '/redux/actions/*'
}));

alias = Object.assign(alias, {
	'react-router': ROOT_CONFIG.NODE_MODULES_PATH + '/react-router/lib/index.js',
	'react-redux': ROOT_CONFIG.NODE_MODULES_PATH + '/react-redux/lib/index.js',
	'redux': ROOT_CONFIG.NODE_MODULES_PATH + '/redux/lib/index.js',
	'redux-thunk': ROOT_CONFIG.NODE_MODULES_PATH + '/redux-thunk/lib/index.js'
});

const antd_svgDir = [
  require.resolve('antd-mobile').replace(/warn\.js$/, '')
];

const svgDirs = antd_svgDir.concat(ROOT_CONFIG.ANTD_SVG_PATH.map((i)=>{
  return i.replace(/\//g, "\\")
}));

var config = {
	context: ROOT_CONFIG.SRC_PATH,
	entry: ROOT_CONFIG.PRODUCTION_JS_MODULE,
	output: {
		path: ROOT_CONFIG.DIST_PATH+"/ibcrm/static/",
		libraryTarget: 'umd',
		filename:  'js/[name].[chunkhash].js',
		chunkFilename:  'js/[name].[chunkhash].js',
		publicPath:ROOT_CONFIG.PUBLIC_PATH,
	},
	module: {
		loaders:[
			{
				test: /[\.jsx|\.js]$/,
				exclude: /node_modules/,
        loader: 'babel',
				presets: [
					'react',
					'es2015'
				]
			},
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css!' + 'postcss!' +
          'less')
      },
      {
        test: /.css$/,
        include: /node_modules/,
        loader:  ExtractTextPlugin.extract("style-loader", "css-loader!postcss")
      },
      {
        test: /\.(gif|jpg|png|woff|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=8192&name=[path][name].[ext]'
      },
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite',
        include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
      }
		]
	},
	resolve: {
		root: ROOT_CONFIG.SRC_PATH,
		alias: alias
	},
	plugins: [

		new webpack.optimize.OccurrenceOrderPlugin(),
		// 具体是的优化是：webpack就能够比对id的使用频率和分布来得出最短的id分配给使用频率高的模块
		new CleanWebpackPlugin(['dist'],{
			root: ROOT_CONFIG.ROOT_PATH + "\\assets",
			verbose: true,
			dry: false
			// exclude: ['shared.js']
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		new CommonsChunkPlugin({
			name: "vendor"
		}),
    new BundleAnalyzerPlugin(),
		// 使用文件名替换数字作为模块ID
		new webpack.NamedModulesPlugin(),
		// 根据文件内容生成 hash
		new WebpackMd5Hash(),
		new ExtractTextPlugin('css/[name].[contenthash].css'),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			output: {
				comments: false
			}
		}),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
	],
	postcss:function () {
		return [precss,autoprefixer,rucksackCss,px2rem(px2remOpts)];
	}
};

// 将entry合并到webpack中
_.merge(config.entry, ROOT_CONFIG.PRODUCTION_ENTRY_PATH);

for (var i = 0;i < ROOT_CONFIG.HTML_JS_RELY.length;i++){
	var H =
		new HtmlWebpackPlugin({
			//filename:'../' + ROOT_CONFIG.HTML_JS_RELY[i].filename + '.html',
			filename:'../../index.html',
			chunks:ROOT_CONFIG.HTML_JS_RELY[i].chunks,
			template: ROOT_CONFIG.SRC_PATH + '/' + ROOT_CONFIG.HTML_JS_RELY[i].filename + '/' + ROOT_CONFIG.HTML_JS_RELY[i].filename + '.html',
			hash:true,
			inject:'body',
			minify: {
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true,
				removeRedundantAttributes: true,
				removeEmptyAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				removeComments: true
			}
		});
	config.plugins.push(H);
}
module.exports = config;





