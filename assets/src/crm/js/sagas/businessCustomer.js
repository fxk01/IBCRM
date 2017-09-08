/**
 * @description: 企业客户异步数据处理
 * @author: xzqiang
 * @create: 2017/5/25
 */
import {put, take, fork} from 'redux-saga/effects'
import handleRequest from './servers'
import {userInfo,loginCode} from '../userInfo'

import {REQUEST_BUSINESS_CUSTOMER,RECEIVE_BUSINESS_CUSTOMER} from '../actions/actionsTypes';

let reqInfo = {
	"enterpriseRecord": {
		"sure":"",
		"custName":"",
		"opptPtype":"",
		"opptType":"",
		"owner":"",
		"ownerScope":"",
		"custProtrade":"",
		"custTrade":"",
		"city":"",
		"isComp":"",
		"province":"",
		"ownerTeam":"",
		"createTs":"",
		"readOnlyflag":"",
		"isFormal":"",
		"cust_category":"",
		"authInfo":[{
			"name":"",
			"authId":"",
			"startTime":"",
			"endTime":"",
			"deptName":"",
			"authRole":""
		}],
		"secode":"",
		"custType":"",
		"custId":"",
		"custRefname":"",
		"country":"",
		"address":"",
		"ownerMobile":"",
		"remark": ""
	},
	"start":"0",
	"length":"10",
	"userInfo":userInfo
};

let reqInfo_start,data;

let dataList = {success: true, businessCustomerList:[]};

const businessCustomerList = ()=>{
	if(data.reqInfo.enterpriseRecord.ownerScope==="mine"){
		data.reqInfo.enterpriseRecord.ownerScope=loginCode
	}else{
		data.reqInfo.enterpriseRecord.ownerScope = ""
	}
	const  defered = handleRequest(`${ctx}/searchEpCust`,'post',Object.assign(reqInfo,data.reqInfo));
	const  posts  =  defered.then(json => {return json})
	.catch(err=> {console.log(err);return []});
	return posts;
};

function* fetchCustomerRequest() {
	const posts = yield businessCustomerList();
	if(posts.code && posts.code.toString() === '0'){
		if(data.reqInfo.start.toString() !== "0"){
			dataList = {success: true, total:posts.pagingObj.total, message:'数据加载成功',businessCustomerList:dataList.businessCustomerList.concat(posts.pagingObj.pagingObj)} ;
		}else{
			dataList = {success: true, total:posts.pagingObj.total, message:'数据加载成功',businessCustomerList:posts.pagingObj.pagingObj}
		}
	}else{
		dataList = {success: false, message:'服务器开小差啦，请稍后重试',businessCustomerList:null}
	}
	
	yield put({type: RECEIVE_BUSINESS_CUSTOMER, posts:dataList});
}

export function* watchBusinessCustomerRequest() {
	while(data = yield take(REQUEST_BUSINESS_CUSTOMER)){
		yield fork(fetchCustomerRequest)
	}
}
