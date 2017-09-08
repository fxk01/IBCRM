/**
 * @description: 接收潜在业务机会列表请求的副作用，触发接收数据action
 * @author: xzqiang
 * @create: 2017/5/22
 */

import {put, take, fork,} from 'redux-saga/effects'
import handleRequest from './servers'
import {userInfo,loginCode} from '../userInfo'

let reqInfo = {"opptyRecord":
		{"opptId":"",
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
			"cust_category":""},
		"start":"2",
		"length":"10",
		"userInfo":userInfo
	};

let data ;
let dataList = {success: true, businessCustomerList:[]};

import {
	REQUEST_BUSINESS_OPPORTUNITY,
	RECEIVE_BUSINESS_OPPORTUNITY} from '../actions/actionsTypes';

const BusinessOpportunityList = ()=>{
	if(data.reqInfo.opptyRecord.ownerScope==="mine"){
		data.reqInfo.opptyRecord.createBy=loginCode
	}else{
		data.reqInfo.opptyRecord.createBy = ""
	}
	if(data.reqInfo.opptyRecord.ownerScope) delete data.reqInfo.opptyRecord.ownerScope;
	const  defered = handleRequest(`${ctx}/searchOppt`,'post',Object.assign(reqInfo,data.reqInfo));
	const  posts  =  defered.then(json => {return json})
	.catch(err=> {console.log(err);return []});
	return posts;
};

function* fetchBusinessOpportunityRequest() {
	const posts = yield BusinessOpportunityList();
	if(posts.code && posts.code.toString() === '0'){
		if(data.reqInfo.start.toString() !== "0"){
			dataList = {success: true, total:posts.pagingObj.total, businessOppoList:dataList.businessOppoList.concat(posts.pagingObj.pagingObj||{})} ;
		}else{
			dataList = {success: true, total:posts.pagingObj.total, businessOppoList:posts.pagingObj.pagingObj}
		}
	}else{
		dataList = {success: false, message:'服务器开小差啦，请稍后重试',businessOppoList:null}
	}
	
	
	yield put({type: RECEIVE_BUSINESS_OPPORTUNITY, posts:dataList});
}

export function* watchBusinessOpportunityRequest() {
	while( data = yield take(REQUEST_BUSINESS_OPPORTUNITY) ){
		yield fork(fetchBusinessOpportunityRequest)
	}
}
