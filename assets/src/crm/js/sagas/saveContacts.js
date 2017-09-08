/**
 * Created by baizilin on 2017/6/22.
 * likaiming
 */


import { put, take, fork, } from 'redux-saga/effects'
import handleRequest from './servers'
import { userInfo } from '../userInfo'

import { REQUEST_NEW_CONTACTS_SAVE, RECEIVE_NEW_CONTACTS_SAVE } from '../actions/actionsTypes';

let data;

let reqInfo = {

};

let saveContactsList = {success: true, saveContactsList:{}};

const saveContacts = ()=>{
  const def = handleRequest(`${ctx}/addContact`, 'post', Object.assign(reqInfo, data.data));
  const posts = def.then(json => {return json})
    .catch(err => {console.log(err);return {}});
  return posts;
};

function* fetchSaveContactsRequest() {
  const posts = yield saveContacts();
  if(posts.code && posts.code.toString() === '0'){
    saveContactsList = {success: true, saveContactsList: posts.list};
  }else{
    saveContactsList = {success: false, message: posts.message, saveContactsList: null}
  }
  yield put({type: RECEIVE_NEW_CONTACTS_SAVE, saveContactsList});
}

export function* watchSaveContactsRequest() {
  while(data = yield take(REQUEST_NEW_CONTACTS_SAVE)){
    yield fork(fetchSaveContactsRequest)
  }
}