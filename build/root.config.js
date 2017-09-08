/**
 * Created by Administrator on 2016/12/12.
 */
"use strict";
var path = require('path');
// 辅助函数
const utils = require('./utils');
// lodash
const _ = require("lodash");
//  根路径
const fullPath  = utils.fullPath;
//  根据传入的正则寻找相对应的路径对象
const pickFiles = utils.pickFiles;
//查找文件夹
const folder = utils.folder;
// 项目根路径
const ROOT_PATH = fullPath('../');
const CACHE_PATH = ROOT_PATH + '/assets/cache';

// 项目源码路径
const SRC_PATH = ROOT_PATH + '/assets/src';
// 产出路径
const DIST_PATH = ROOT_PATH + '/assets/dist';
//  node_modules
const NODE_MODULES_PATH =  ROOT_PATH + '/node_modules';
//  PRODUCT ENTRY PATH
const ENTRY_PATH=pickFiles({
		id: /([^\/]+).(entry\.js)$/,
		pattern: SRC_PATH + '/**/*.entry.js'
	});

//ANTD SVG FILE
const ANTD_SVG_PATH=folder({
  pattern: SRC_PATH + '/**/img/svg'
});

//PUBLIC PATH
const PUBLIC_PATH = "/roadshow/ibcrm/static/";

//页面JS模块关系
const JS_MODULE = {
		//框架模块
	vendor:[
		'babel-polyfill',
		'antd-mobile-demo-data',
		'react',
		'react-dom',
		'react-router',
		'react-redux',
		'redux-saga',
		'fastclick',
		'isomorphic-fetch',
		'moment',
		'redux',
		'history',
	]
	//	预留优化——————————————————————————————————————————————————————
};

//开发环境JS模块配置组合
var DEV_JS_MODULE;
_.forEach(JS_MODULE,function (n, key) {
	switch (key){
		case "vendor":
			DEV_JS_MODULE = [].concat(n);
			break;
		//	预留优化——————————————————————————————————————————————————————
	}
});

//生产环境JS模块配置
var PRODUCTION_JS_MODULE = {};
_.forEach(JS_MODULE,function (n, key) {
	switch (key){
		case "vendor":
			PRODUCTION_JS_MODULE.vendor = n;
			break;
		//	预留优化——————————————————————————————————————————————————————
	}
});

//chunk Module
var CHUNK_MODULE;
CHUNK_MODULE = _.keys(PRODUCTION_JS_MODULE);

//HTML MODULE RELY_ON
var HTML_JS_RELY=[];
_.forEach(ENTRY_PATH,function (n, key) {
	HTML_JS_RELY = HTML_JS_RELY.concat({filename:key,chunks:[key,'vendor']})
});

const ROOT_CONFIG ={
	ROOT_PATH:ROOT_PATH,
	CACHE_PATH:CACHE_PATH,
	SRC_PATH:SRC_PATH,
	DIST_PATH:DIST_PATH,
	NODE_MODULES_PATH:NODE_MODULES_PATH,
	PUBLIC_PATH:PUBLIC_PATH,
	PRODUCTION_ENTRY_PATH:ENTRY_PATH,
	JS_MODULE:JS_MODULE,
	DEV_JS_MODULE:DEV_JS_MODULE,
	PRODUCTION_JS_MODULE:PRODUCTION_JS_MODULE,
	CHUNK_MODULE:CHUNK_MODULE,
	HTML_JS_RELY:HTML_JS_RELY,
  ANTD_SVG_PATH:ANTD_SVG_PATH
};

module.exports = ROOT_CONFIG;