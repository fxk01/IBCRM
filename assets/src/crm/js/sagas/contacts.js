/**
 * Created by baizilin on 2017/6/6.
 * 联系人异步数据处理
 * likaiming
 */

import { put, take, fork,} from 'redux-saga/effects'
import handleRequest from './servers'
import { userInfo,loginCode } from '../userInfo'

import { REQUEST_BUSINESS_CONTACTS, RECEIVE_BUSINESS_CONTACTS } from '../actions/actionsTypes';

let reqInfo = {
  "contactRecord": {
    "contactName": "",
    "positionName": "",
    "custName": "",
    "custId": "I00013",
    "contactsType": "",
    "custType": "",
    "ecifId": "",
    "email": "",
    "mobile": "",
    "phone": "",
    "industry": "",
    "readOnlyflag": "",
    "authName": "",
    "createTs": "",
    "contactId": "",
    "authInfo": [{
      "name": "",
      "authId": "",
      "startTime": "",
      "endTime": "",
      "deptName": "",
      "authRole": ""
    }],
    "isMain": "",
    "fax": "",
    "msn": "",
    "qq": "",
    "remark": "",
    "team": "",
    "frequency": "",
    "cust_category": "",
    "createBy": userInfo.userCode,
  },
  "start": "0",
  "length": "10",
  "userInfo": userInfo,
};

let reqInfo_start,data;

let dataList = {
  success: true,
  contactsList:[]
};

const contactsList = () => {
	if(data.data.contactRecord.createBy==="mine"){
		data.data.contactRecord.createBy=loginCode
	}else{
		data.data.contactRecord.createBy = ""
	}
  const  defered = handleRequest(`${ctx}/contactSearchEpCust`, 'post', Object.assign(reqInfo, data.data));
  const  posts  =  defered.then(json => {return json})
    .catch(err=> console.log(err));
  return posts;
};

function* fetchContactsRequest() {
  const posts = yield contactsList();
  if(posts !== undefined && posts.code && posts.code.toString() === '0'){
    if(data.data.start.toString() !== "0"){
      dataList = {
        success: true,
        total: posts.pagingObj.total,
        message: '数据加载成功',
        contactsList: dataList. contactsList.concat(posts.pagingObj.pagingObj),
      };
    }else{
      dataList = {
        success: true,
        total: posts.pagingObj.total,
        message: '数据加载成功',
        contactsList: posts.pagingObj.pagingObj,
      }
    }
  }else {
    dataList = {
      success: false,
      message: '服务器开小差啦，请稍后重试',
      contactsList: null,
    }
  }
  yield put({type: RECEIVE_BUSINESS_CONTACTS, posts:dataList});
}

export function* watchContactsRequest() {
  while(data = yield take(REQUEST_BUSINESS_CONTACTS)){
    yield fork(fetchContactsRequest)
  }
}