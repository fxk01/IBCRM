/**
 * Created by baizilin on 2017/6/19.
 * likaiming
 */


import {put, take, fork,} from 'redux-saga/effects'
import handleRequest from './servers'


import { REQUEST_NEW_CONTACTS_TYPE, RECEIVE_NEW_CONTACTS_TYPE } from '../actions/actionsTypes';

let data;

let reqInfo = {};

let newContactsType = {success: true, newContactsType:{}};

const newContacts = ()=>{
  const defered = handleRequest(`${ctx}/findContactType`,'post',Object.assign(reqInfo,data.reqInfo));
  const posts = defered.then(json => {return json})
    .catch(err => {console.log(err);return {}});
  return posts;
};

function* fetchNewContactsRequest() {
  const posts = yield newContacts();
  if(posts.code && posts.code.toString() === '0'){
    newContactsType = {success: true, newContactsType: posts.list}
  }else{
    newContactsType = {success: false, message: '服务器开小差啦，请稍后重试', newContactsType: null}
  }
  yield put({type: RECEIVE_NEW_CONTACTS_TYPE, newContactsType});
}

export function* watchNewContactsRequest() {
  while(data = yield take(REQUEST_NEW_CONTACTS_TYPE)){
    yield fork(fetchNewContactsRequest)
  }
}