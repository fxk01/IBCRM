/**
 * @description:
 * @author: zy
 * @create: 2017/5/22
 */


import {put, take, fork,} from 'redux-saga/effects'
import handleRequest from './servers'
import {userInfo} from '../userInfo'

let reqInfo =
    {"visitRecord":
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

            "visitId":"",
            "cust_category":""},
        "loginCode":""}

let data ;
let dataList = {success: true, visitInfo:[]};

import {
    REQUEST_NEW_VISIT,
    RECEIVE_NEW_VISIT} from '../actions/actionsTypes';

const NewVisitList = ()=>{
  const  defered = handleRequest(`${ctx}/addVisitRecord`,'post',Object.assign(reqInfo,data.reqInfo));
  const  posts  =  defered.then(json => {return json})
    .catch(err=> {console.log(err);return {}});
  return posts;
};

function* fetchNewVisitRequest() {
  const posts = yield NewVisitList();
  if(posts.code&&posts.code.toString()==='0'){
      dataList = {success: true,message:''}
  }else{
      dataList = {success: false, message:'服务器开小差啦，请稍后重试',visitInfo:posts}
  }




  yield put({type: RECEIVE_NEW_VISIT, posts:dataList});
}

export function* watchNewVisitRequest() {
  while( data = yield take(REQUEST_NEW_VISIT) ){
    yield fork(fetchNewVisitRequest)
  }
}
