/**
 * @description: 业务机会数据请求active
 * @author: xzqiang
 * @create: 2017/5/22
 */
import {REQUEST_BUSINESS_OPPORTUNITY,RECEIVE_BUSINESS_OPPORTUNITY} from './actionsTypes'

export const onReqBusinessOpportunity = (reqInfo) => (
  {type: REQUEST_BUSINESS_OPPORTUNITY,
    reqInfo
  }
  );

export const onRecBusinessOpportunity = (dateList) => ({
  type: RECEIVE_BUSINESS_OPPORTUNITY,
  dateList
});