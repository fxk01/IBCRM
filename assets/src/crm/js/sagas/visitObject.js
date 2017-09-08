/**
 * @description:
 * @author: zy
 * @create: 2017/5/22
 */


import {put, take, fork,} from 'redux-saga/effects'
import handleRequest from './servers'
import {userInfo} from '../userInfo'

let reqInfo =
    {"custId":"",
        "custName":"",
        "userInfo":userInfo
    }

let data ;
let dataList = {success: true, nameList:[]};

import {
    REQUEST_VISIT_OBJECT,
    RECEIVE_VISIT_OBJECT} from '../actions/actionsTypes';

const VisitObjectList = ()=>{
  const  defered = handleRequest(`${ctx}/searchVisitObj`,'post',Object.assign(reqInfo,data.reqInfo));
  const  posts  =  defered.then(json => {return json})
    .catch(err=> {console.log(err);return {}});
  return posts;
};

function* fetchVisitObjectRequest() {
  const posts = yield VisitObjectList();

  if(posts.code&&posts.code.toString()==='0'){
      dataList = {success: true, nameList:posts.visitObjList}
  }else{
      dataList = {success: false, message:'服务器开小差啦，请稍后重试',nameList:posts}
  }

  yield put({type: RECEIVE_VISIT_OBJECT, posts:dataList});
}

export function* watchVisitObjectRequest() {
  while( data = yield take(REQUEST_VISIT_OBJECT) ){
    yield fork(fetchVisitObjectRequest)
  }
}
