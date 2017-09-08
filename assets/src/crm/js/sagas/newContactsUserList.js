/**
 * Created by baizilin on 2017/6/19.
 * likaiming
 */



import {put, take, fork,} from 'redux-saga/effects'
import handleRequest from './servers'


import { REQUEST_NEW_CONTACTS_USER_TYPE, RECEIVE_NEW_CONTACTS_USER_TYPE } from '../actions/actionsTypes';

let data;

let reqInfo = {};

let newContactsTypeList = {success: true, newContactsType:{}};

const newContactsUserType = ()=>{
  const def = handleRequest(`${ctx}/findCustType`,'post',Object.assign(reqInfo,data.reqInfo));
  const posts = def.then(json => {return json})
    .catch(err => {console.log(err);return {}});
  return posts;
};

function* fetchNewContactsUserTypeRequest() {
  const posts = yield newContactsUserType();
  if(posts.code && posts.code.toString() === '0'){
    newContactsTypeList = {success: true, newContactsType: posts.list};
  }else{
    newContactsTypeList = {success: false, message: '服务器开小差啦，请稍后重试', newContactsType: null}
  }
  yield put({type: RECEIVE_NEW_CONTACTS_USER_TYPE, newContactsTypeList});
}

export function* watchNewContactsUserTypeRequest() {
  while(data = yield take(REQUEST_NEW_CONTACTS_USER_TYPE)){
    yield fork(fetchNewContactsUserTypeRequest)
  }
}