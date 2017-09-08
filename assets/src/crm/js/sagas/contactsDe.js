/**
 * Created by K0170003 on 2017/7/27.
 */

import { put, take, fork,} from 'redux-saga/effects'
import handleRequest from './servers'
import { userInfo } from '../userInfo'
import { REQUEST_CONTACTS_DE, RECEIVE_CONTACTS_DE } from '../actions/actionsTypes'

let reqInfo = {
  "contactRecord": {
    "custId": "I00013",
    "contactId": "",
    "createBy": userInfo.userCode,
  },
  "userInfo": userInfo,
};

let reqInfo_start,data;

let dataList = {
  success: true,
  contactsDeList:[]
};

const contactsDeList = () => {
  const  defered = handleRequest(`${ctx}searchContactInfo`, 'post', Object.assign(reqInfo, data.data));
  const  posts  =  defered.then(json => {return json})
    .catch(err=> console.log(err));
  return posts;
};

function* fetchContactsDeRequest() {
  const posts = yield contactsDeList();
  if(posts !== undefined && posts.code && posts.code.toString() === '0'){
    dataList = {
      success: true,
      message: '数据加载成功',
      contactsDeList: posts.contactInfo,
    };
  }else {
    dataList = {
      success: false,
      message: '服务器开小差啦，请稍后重试',
      contactsDeList: null,
    }
  }
  yield put({type:RECEIVE_CONTACTS_DE , posts:dataList});
}

export function* watchContactsDeRequest() {
  while(data = yield take(REQUEST_CONTACTS_DE)){
    yield fork(fetchContactsDeRequest)
  }
}