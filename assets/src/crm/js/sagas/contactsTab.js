/**
 * Created by baizilin on 2017/6/6.
 * 联系人异步数据处理
 * likaiming
 */

import {
    takeEvery,
    delay,
    takeLatest,
    buffers,
    channel,
    eventChannel,
    END
} from 'redux-saga'
import {
    put,
    call,
    take,
    fork,
    select,
    actionChannel,
    cancel,
    cancelled
} from 'redux-saga/effects'
import handleRequest from './servers'
import { userInfo } from '../userInfo'

import { REQUEST_CONTACTS_TAB, RECEIVE_CONTACTS_TAB } from '../actions/actionsTypes';

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
        "createBy": ""
    },
    "start": "0",
    "length": "10",
    "userInfo": userInfo,
};

let reqInfo_start, data;

let dataList = {
    success: true,
    contactsTabList:[]
};

const contactsTabList = () => {`${ctx}/contactSearchEpCust`
    const  defered = handleRequest(`${ctx}/contactSearchEpCust`, 'post', Object.assign(reqInfo, data.data));
    const  posts  =  defered.then(json => {return json})
        .catch(err=> console.log(err));
    return posts;
};

function* fetchContactsTabRequest() {
    const posts = yield contactsTabList();
    if(posts !== undefined && posts.code && posts.code.toString() === '0'){
        if(data.data.start.toString() !== "0"){
            dataList = {
                success: true,
                total: posts.pagingObj.total,
                message: '数据加载成功',
                contactsTabList: dataList.contactsTabList.concat(posts.pagingObj.pagingObj),
            };
        }else {
            dataList = {
                success: true,
                total: posts.pagingObj.total,
                message: '数据加载成功',
                contactsTabList: posts.pagingObj.pagingObj,
            };
        }
    }else {
        dataList = {
            success: false,
            message: '服务器开小差啦，请稍后重试',
            contactsTabList: null,
        }
    }
    yield put(
        {type: RECEIVE_CONTACTS_TAB, posts:dataList}
        );
}

export function* watchContactsTabRequest() {
    while(data = yield take(REQUEST_CONTACTS_TAB)){
        yield fork(fetchContactsTabRequest)
    }
}