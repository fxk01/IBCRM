/**
 * @description: 企业客户action
 * @author: xzqiang
 * @create: 2017/5/24
 */

import {REQUEST_BUSINESS_CUSTOMER,RECEIVE_BUSINESS_CUSTOMER} from './actionsTypes'

export const onRequestBusinessCustomer = (reqInfo) => ({
  type: REQUEST_BUSINESS_CUSTOMER,
  reqInfo
});

export const onReceiveBusinessCustomer = (dateList) => ({
  type: RECEIVE_BUSINESS_CUSTOMER,
  dateList
});
