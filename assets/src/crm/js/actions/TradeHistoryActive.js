/**
 * @description: 企业客户-过往交易action
 * @author: zy
 * @create: 2017/6/7
 */
import {REQUEST_TRADE_HISTORY,RECEIVE_TRADE_HISTORY} from './actionsTypes'

export const onReqTradeHistory = (reqInfo) => (
  {type: REQUEST_TRADE_HISTORY,
    reqInfo
  }
  );

export const onRecTradeHistory = (dateList) => ({
  type: RECEIVE_TRADE_HISTORY,
  dateList
});