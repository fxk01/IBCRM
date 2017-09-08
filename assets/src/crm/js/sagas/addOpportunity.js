/**
 * @description: 企业客户异步数据处理
 * @author: xzqiang
 * @create: 2017/5/25
 */
import {put, take, fork} from 'redux-saga/effects'
import handleRequest from './servers'
import {loginCode} from '../userInfo'

import {REQUEST_ADD_OPPORTUNITY,RECEIVE_ADD_OPPORTUNITY} from '../actions/actionsTypes'

let reqInfo = {
	"opptyRecord":{
		"opptId":"",
		"startDate":"",
		"endDate":"",
		"visitId":"",
		"opptPtype":"",
		"oppType":"",
		"opptDesc":"",
		"createContact":"",
		"createBy":"",
		"cCreateBy":"",
		"createTs":"",
		"comments":"",
		"visitDate":"",
		"custType":"",
		"reviewType":"",
		"custName":"",
		"custId":"",
		"cust_category":"" //客户类别
	},
	"loginCode":loginCode
};

let data;

let dataList = {success: true, businessCustomerList:[]};

const addOpportunity = ()=>{
	const  defered = handleRequest(`${ctx}/addOppt`,'post',Object.assign(reqInfo,data.reqInfo));
	const  posts  =  defered.then(json => {return json})
	.catch(err=> {console.log(err);return []});
	return posts;
};

function* addOpportunityRequest() {
	const posts = yield addOpportunity();
	if(posts.code && posts.code.toString() === '0'){
		dataList = {success: true, message:posts.message}
	}else{
		dataList = {success: false, message:'服务器开小差啦，请稍后重试'}
	}
	
	yield put({type: RECEIVE_ADD_OPPORTUNITY, posts:dataList});
}

export function* watchAddOpportunityRequest() {
	while(data = yield take(REQUEST_ADD_OPPORTUNITY)){
		yield fork(addOpportunityRequest)
	}
}
