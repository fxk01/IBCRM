/**
 * @description: 过往交易saga
 * @author: zy
 * @create: 2017/6/7
 */


import {put, take, fork,} from 'redux-saga/effects'
import handleRequest from './servers'


let reqInfo =
    {
        "tradeHistoryInfo":
        {
            "project_id":"",
            "shortName":"",
            "type":"",
            "projectTypeName":"",
            "brokerName":"",
            "custId":"",
            "userName":"",
            "realName":"",
            "trade_amount":""
        },
        "start":"",
        "length":""
    }

let data ;
let dataList = {success: true, tradeHistoryList:[]};

import {
    REQUEST_TRADE_HISTORY,
    RECEIVE_TRADE_HISTORY} from '../actions/actionsTypes';

const TradeHistoryList = ()=>{
  const  defered = handleRequest(`${ctx}/searchHistoryInvestList`,'post',Object.assign(reqInfo,data.reqInfo));
  const  posts  =  defered.then(json => {return json})
    .catch(err=> {console.log(err);return {}});
  return posts;
};

function* fetchTradeHistoryRequest() {
  const posts = yield TradeHistoryList();
  if(posts.code && posts.code.toString() === '0'){
    if(data.reqInfo.start.toString() !== "0"){
      dataList = {success: true, tradeHistoryList:dataList.tradeHistoryList.concat(posts.pagingObj.pagingObj)} ;
    }else{
      dataList = {success: true, tradeHistoryList:posts.pagingObj.pagingObj}
    }
  }else{
    dataList = {success: false, message:'服务器开小差啦，请稍后重试',tradeHistoryList:posts}
  }


  yield put({type: RECEIVE_TRADE_HISTORY, posts:dataList});
}

export function* watchTradeHistoryRequest() {
  while( data = yield take(REQUEST_TRADE_HISTORY) ){
    yield fork(fetchTradeHistoryRequest)
  }
}
