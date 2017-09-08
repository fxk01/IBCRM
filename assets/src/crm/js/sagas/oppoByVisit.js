/**
 * @description: 接收潜在业务机会列表请求的副作用，触发接收数据action
 * @author: xzqiang
 * @create: 2017/5/22
 */

import {put, take, fork,} from 'redux-saga/effects'
import handleRequest from './servers'
import {userInfo} from '../userInfo'

let reqInfo ={"visitId":"",
					"userInfo":
					{"deptName":"",
						"userCode":userInfo.userCode,
						"roleList":[""]}
				};

let data ;
let dataList = {success: true, OppoListByVisit:[]};

import {
    REQUEST_OPPORTUNITY_BY_VISIT,
    RECEIVE_OPPORTUNITY_BY_VISIT} from '../actions/actionsTypes';

const OpportunityListByVisit = ()=>{
	const  defered = handleRequest(`${ctx}/searchOpptListByVisit`,'post',Object.assign(reqInfo,data.reqInfo));
	const  posts  =  defered.then(json => {return json})
	.catch(err=> {console.log(err);return []});
	return posts;
};

function* fetchOpportunityByVisitRequest() {
	const posts = yield OpportunityListByVisit();
	console.dir(posts);
	if(posts.code && posts.code.toString() === '0'){
		dataList = {success: true, total:posts.list.length, OppoListByVisit:posts.list}
	}else{
		dataList = {success: false, message:'服务器开小差啦，请稍后重试',OppoListByVisit:null}
	}
	
	yield put({type: RECEIVE_OPPORTUNITY_BY_VISIT, posts:dataList});
}

export function* watchOpportunityByVisitRequest() {
	while( data = yield take(REQUEST_OPPORTUNITY_BY_VISIT) ){
		yield fork(fetchOpportunityByVisitRequest)
	}
}
