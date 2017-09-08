/**
 * @description:
 * @author: zy
 * @create: 2017/5/22
 */

import {put,take, fork,} from 'redux-saga/effects'
import handleRequest from './servers'


let reqInfo =
    {"custId":""}

let data ;
let dataList = {success: true, customerInfoList:[]};

import {
    REQUEST_CUSTOMER_INFO,
    RECEIVE_CUSTOMER_INFO} from '../actions/actionsTypes';

const CustomerInfoList = ()=>{
  const  defered = handleRequest(`${ctx}/searchEpcustInfo`,'post',Object.assign(reqInfo,data.reqInfo));
  const  posts  =  defered.then(json => {return json})
    .catch(err=> {console.log(err);return {}});
  return posts;
};

function* fetchCustomerInfoRequest() {
  const posts = yield CustomerInfoList();
  // console.log("posts:"+JSON.stringify(posts));

  if(posts.code&&posts.code.toString()==='0'){
      dataList = {success: true, customerInfoList:posts.epCustInfo}
  }else{
      dataList = {success: false, message:'服务器开小差啦，请稍后重试',customerInfoList:posts}
  }




  yield put({type: RECEIVE_CUSTOMER_INFO, posts:dataList});
}

export function* watchCustomerInfoRequest() {
  while( data = yield take(REQUEST_CUSTOMER_INFO) ){
    yield fork(fetchCustomerInfoRequest)
  }
}
