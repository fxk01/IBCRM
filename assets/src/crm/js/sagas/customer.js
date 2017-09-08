/**
 * xzqiang
 * Created by admin on 2017/5/10.
 */
import {delay,} from 'redux-saga'
import {put, call, take, fork,} from 'redux-saga/effects'
import handleRequest from './servers'
import {userInfo,loginCode} from '../userInfo'

import {
	REQUEST_CUSTOMER_LIST,
	RECEIVE_CUSTOMER_LIST} from '../actions/actionsTypes';

let data;

let reqInfo = {"visitRecord":
	{"visitDate":"",
		"customerName":"",
		"customerId":"",
		"participants":"",
		"readOnlyflag":"",
		"participantsId":"",
		"visitObject":"",
		"sensitive":"",
		"startDate":"",
		"endDate":"",
		"positionName":"",
		"interviewSummary":"",
		"caseAnalyse":"",
		"customerType":"",
		"busChance":"",
		"createBy":"",
		"conditions":[{
			"conditionId":"",
			"materialName":"",
			"materialProvider":"",
			"createdTime":""}],
		"authInfo":[{
			"authId":"",
			"name":"",
			"authRole":"",
			"deptName":"",
			"startTime":"",
			"endTime":""}],
		"contactId":"",
		"projectId":"",
		"projectName":"",
		"visitType":"",
		"visitId":"",
		"cust_category":""},
	"start":"0",
	"length":"10",
	"userInfo":userInfo};

let dataList = {success: true,total:null ,customerList:[]};

const customerList = ()=>{
	if(data.reqInfo.requestType) delete data.reqInfo.requestType;
	if(data.reqInfo.visitRecord.createBy==="mine"){
		data.reqInfo.visitRecord.createBy=loginCode
	}else{
		data.reqInfo.visitRecord.createBy = ""
	}
	
	const  defered = handleRequest(`${ctx}/searchVisitRecordList`,'post',Object.assign(reqInfo,data.reqInfo));
	const  posts  =  defered.then(json => {return json})
	.catch(err => {console.log(err);return []});
	return posts;
};

function* fetchCustomerRequest() {
	yield call(delay, 1000);
	const posts = yield customerList();
	if(posts.code && posts.code.toString() === '0'){
		if(data.reqInfo.start.toString() !== "0"){
			dataList = {success: true, total:posts.pagingObj.total,customerList:dataList.customerList.concat(posts.pagingObj.pagingObj)} ;
		}else{
			dataList = {success: true,  total:posts.pagingObj.total, customerList:posts.pagingObj.pagingObj}
		}
	}else{
		dataList = {success: false, message:'服务器开小差啦，请稍后重试',customerList : null}
	}
	yield put({type: RECEIVE_CUSTOMER_LIST, posts:dataList});
}

export function* watchCustomerRequest() {
	while(data = yield take(REQUEST_CUSTOMER_LIST)){
		yield fork(fetchCustomerRequest)
	}
}