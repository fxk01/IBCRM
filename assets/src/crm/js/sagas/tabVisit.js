/**
 * @description: 客户拜访 tab saga
 * @author: zy
 * @create: 2017/6/7
 */

import {delay} from 'redux-saga'
import {put,call, take, fork,} from 'redux-saga/effects'
import handleRequest from './servers'
import {userInfo} from '../userInfo'
import {
    REQUEST_TAB_VISIT_LIST,
    RECEIVE_TAB_VISIT_LIST} from '../actions/actionsTypes';

let data;

let reqInfo = {
    "visitRecord":
    {"visitDate":"",
    "customerName":"",
    "customerId":"",
    "participants":"",
    "readOnlyflag":"",
    "participantsId":"",
    "visitObject":"",
    "sensitive":"N",
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
    "userInfo":userInfo
};

let dataList = {success: true,total:null ,tabVisitList:[]};

const tabVisitList = ()=>{
  const  defered = handleRequest(`${ctx}/searchVisitRecordList`,'post',Object.assign(reqInfo,data.reqInfo));
  const  posts  =  defered.then(json => {return json})
    .catch(err => {console.log(err);return []});
  return posts;
};

function* fetchTabVisitRequest() {
  yield call(delay, 1000);
  const posts = yield tabVisitList();
  if(posts.code && posts.code.toString() === '0'){
    if(data.reqInfo.start.toString() !== "0"){
      dataList = {success: true, total:posts.pagingObj.total,tabVisitList:dataList.tabVisitList.concat(posts.pagingObj.pagingObj)} ;
    }else{
      dataList = {success: true,  total:posts.pagingObj.total, tabVisitList:posts.pagingObj.pagingObj}
    }
  }else{
    dataList = {success: false, message:'服务器开小差啦，请稍后重试',tabVisitList : null}
  }
  yield put({type: RECEIVE_TAB_VISIT_LIST, posts:dataList});
}

export function* watchTabVisitRequest() {
  while(data = yield take(REQUEST_TAB_VISIT_LIST)){
    yield fork(fetchTabVisitRequest)
  }
}