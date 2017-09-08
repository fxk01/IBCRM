/**
 * @description: 客户拜访-拜访记录 saga
 * @author: zy
 * @create: 2017/6/12
 */

import {put, take, fork,} from 'redux-saga/effects'
import handleRequest from './servers'


let reqInfo =
    {"visitId":""}

let data ;
let dataList = {success: true, info:[]};

import {
    REQUEST_VISIT_RECORD_INFO,
    RECEIVE_VISIT_RECORD_INFO} from '../actions/actionsTypes';

const VisitRecordInfoList = ()=>{
  const  defered = handleRequest(`${ctx}/searchVisitInfo`,'post',Object.assign(reqInfo,data.reqInfo));
  const  posts  =  defered.then(json => {return json})
    .catch(err=> {console.log(err);return {}});
  return posts;
};

function* fetchVisitRecordInfoRequest() {
  const posts = yield VisitRecordInfoList();
    // console.log("posts:"+JSON.stringify(posts));

  if(posts.code&&posts.code.toString()==='0'){
      dataList = {success: true, info:posts.record}
  }else{
      dataList = {success: false, message:'服务器开小差啦，请稍后重试',info:posts}
  }

  yield put({type: RECEIVE_VISIT_RECORD_INFO, posts:dataList});
}

export function* watchVisitRecordInfoRequest() {
  while( data = yield take(REQUEST_VISIT_RECORD_INFO) ){
    yield fork(fetchVisitRecordInfoRequest)
  }
}
