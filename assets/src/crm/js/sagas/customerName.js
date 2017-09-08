/**
 * @description:
 * @author: zy
 * @create: 2017/5/22
 */

import {put, take, fork,cancel} from 'redux-saga/effects'
import handleRequest from './servers'

let reqInfo =
    {"custName":"上海","loginCode":"007441"}

let action ;
let dataList = {success: true, nameList:[]};

import {
    RECEIVE_CUSTOMER_NAME,
    REQUEST_CUSTOMER_NAME} from '../actions/actionsTypes';

const CustomerNameList = ()=>{
  const  defered = handleRequest(`${ctx}/searchCustByname`,'post',Object.assign(reqInfo,action.reqInfo));
  const  posts  =  defered.then(json => {return json})
    .catch(err=> {console.log(err);return {}});
  return posts;
};

function* fetchCustomerNameRequest() {
  const posts = yield CustomerNameList();


  if(posts.code&&posts.code.toString()==='0'){
      dataList = {success: true, nameList:posts.custList}
  }else{
      dataList = {success: false, message:'服务器开小差啦，请稍后重试',nameList:posts}
  }




  yield put({type: RECEIVE_CUSTOMER_NAME, posts:dataList});
}

export function* watchCustomerNameRequest() {
    let lastTask;
    while(true){
        action = yield take(REQUEST_CUSTOMER_NAME);
        if (lastTask) yield  cancel(lastTask);
        lastTask = yield fork(fetchCustomerNameRequest)
    }
}
