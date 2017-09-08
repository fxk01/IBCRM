/**
 * @description: 企业客户-基础信息action
 * @author: zy
 * @create: 2017/6/7
 */
import {REQUEST_CUSTOMER_INFO,RECEIVE_CUSTOMER_INFO} from './actionsTypes'

export const onReqCustomerInfo= (reqInfo) => (
  {type: REQUEST_CUSTOMER_INFO,
    reqInfo
  }
  );

export const onRecCustomerInfo = (dateList) => ({
  type: RECEIVE_CUSTOMER_INFO,
  dateList
});