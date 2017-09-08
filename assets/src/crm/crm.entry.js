/**
 * Created by Administrator on 2017/1/17.
 */
import 'babel-polyfill';
import React from 'react';
import FastClick   from 'fastclick'; // 这个需要放到react下方才行
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import Root from './js/Root';
import {sendPageInfo} from '../../middlewares/com'
import {store} from './js/store/configureStore'
import rootSage from './js/sagas';
require('./js/qingjs');
const RedBox = require('redbox-react').default;
const rootEl = document.getElementById('app');
store.runSaga(rootSage);

// //获取用户数据
XuntongJSBridge.call('getPersonInfo', {}, function(result){
	const userinfo = JSON.stringify(result);
	const obj = eval('(' + userinfo + ')');
	const userId = obj.data.userName;
	alert(userId);
	sessionStorage.setItem("userId", userId);
});

//加载pike
sendPageInfo("007441");

window.addEventListener('load', () => {
  FastClick.attach(document.body);
});

window.ctx = '/ibcrm/app';

//window.ontouchstart = function(e) { e.preventDefault(); };

try {
	render(
		<Root store={store} history={browserHistory}/>
		,
		rootEl
	);
} catch (e) {
	render(
		<RedBox error={e}>
			<Root store={store} history={browserHistory} />
		</RedBox>,
		rootEl
	);
}