"use strict"

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const proxyMiddleware = require('http-proxy-middleware');
const fs = require('fs');
const jsdom = require('jsdom');
const routes = require('./routes/index');
const config = require('./config/proxy.config');
const webpackMiddleWare = require('./build/webpack.config');
const bundle = require('./build/dll/bundle-config.json');
const app = express();

// 初始化 state
app.locals.initialState = {};

// 设置调试模式
app.set('debug', app.get('env') === 'development');


	//开启接口代理
	// 调试环境开启接口代理
	var proxyConfig = config.API_PROXY_CONFIG;
	// 配置接口代理路径
	var context = proxyConfig.API_PATH;
	// 配置代理选项
	var options = {
		target: proxyConfig.API_HOST,
		changeOrigin: proxyConfig.changeOrigin,
		pathRewrite: proxyConfig.pathRewrite,
		onProxyReq:function (proxyReq, req, res){
		// console.log(req)
		}
	};
	// 创建代理中间件
	var proxy = proxyMiddleware(options);
	app.use(context,proxy);

//调用webpack配置文件
	webpackMiddleWare(app, app.get('debug'));

// 模板引擎设置
if (app.get('debug')){
	app.set('views', path.join(__dirname, 'assets/src'));
} else {
	app.set('views', path.join(__dirname, 'assets/dist'));
}
app.set('view engine','html');
app.engine('html', require('ejs').renderFile);

//body cookie parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(logger('dev'));

if (!app.get('debug')) {
	app.use(express.static(path.join(__dirname, 'assets/dist')));
}else{
	app.use(express.static(path.join(__dirname, 'assets/src')));
}
app.use(compression());

app.use('/', routes);

// 修改render方法
app._render = app.render;
app.render = function (name, options, callback) {
	if (app.get('debug')) {
		// 匹配同名目录下的同名文件
		const jsDOMFormatter = jsdom.jsdom;
		const serializeDocument = jsdom.serializeDocument;
		const window = jsDOMFormatter().defaultView;
		const filename = path.join(app.get('views'), name, name + '.' + app.get('view engine'));
		const injectStyle = (err, html) => {
			var htmlDOM = jsDOMFormatter(html);
			// 注入style
			var styleTag = window.document.createElement('link');
			styleTag.setAttribute('rel', 'stylesheet');
			styleTag.href = `/${name}.entry.css`;
			
			//注入JS
			var JS_Tag1 = window.document.createElement('script');
			var JS_Tag2 = window.document.createElement('script');
			JS_Tag1.src = '/' + bundle.vendor.js;
			JS_Tag2.src = `/${name}.entry.js`;
			htmlDOM.head.appendChild(styleTag);
			htmlDOM.body.appendChild(JS_Tag1);
			htmlDOM.body.appendChild(JS_Tag2);
			callback.call(this,err, serializeDocument(htmlDOM));
		};
		if (fs.existsSync(filename)) {
			// 同名文件存在,渲染该文件
			app._render(filename, options, injectStyle);
		}else {
			// 同名文件不存在,按原有逻辑渲染
			app._render(name, options, callback);
		}
	}else {
		app._render(name, options, callback);
	}
};

// 404错误处理
app.use((req, res, next) => {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// 异常处理
if (app.get('env') === 'development') {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.send(err.toString());
	});
}

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send(err.toString());
});

module.exports = app;

