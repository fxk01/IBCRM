/**
 * @description:
 * @author: zy
 * @create: 2017/5/22
 */

import {put, take, fork,cancel} from 'redux-saga/effects'
import handleRequest from './servers'

let reqInfo =
    {"iBEmployee":{"userCode":"","userName":"","deptName":"","duty":"","mobile":"","email":""}}

let action ;
let dataList = {success: true, empList:[]};

import {
    REQUEST_EMP,
    RECEIVE_EMP} from '../actions/actionsTypes';

const empList = ()=>{
  const  defered = handleRequest(`${ctx}/seaarchEmpList`,'post',Object.assign(reqInfo,action.reqInfo));
  const  posts  =  defered.then(json => {return json})
    .catch(err=> {console.log(err);return {}});
  return posts;
};

function* fetchEmpRequest() {
  const posts = yield empList();
  if(posts.code&&posts.code.toString()==='0'){
      dataList = {success: true, empList:posts.empList}
  }else{
      dataList = {success: false, message:'服务器开小差啦，请稍后重试',empList:posts}
  }

  yield put({type: RECEIVE_EMP, posts:dataList});
}

export function* watchEmpRequest() {
    let lastTask;
    while(true){
        action = yield take(REQUEST_EMP);
        if (lastTask) yield  cancel(lastTask);
        lastTask = yield fork(fetchEmpRequest)
    }
}
