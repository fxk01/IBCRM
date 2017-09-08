/**
 * xzqiang
 * Created by admin on 2017/5/10.
 */
import {REQUEST_CUSTOMER_NAME,RECEIVE_CUSTOMER_NAME} from './actionsTypes'

export const onRequestCustomerNameList = (reqInfo) => (
    {type: REQUEST_CUSTOMER_NAME,
      reqInfo
    }
  );

export const onReceiveCustomerNameList = (dateList) => ({
  type: RECEIVE_CUSTOMER_NAME,
  dateList
});

