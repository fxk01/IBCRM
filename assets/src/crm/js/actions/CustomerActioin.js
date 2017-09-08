/**
 * xzqiang
 * Created by admin on 2017/5/10.
 */
import {REQUEST_CUSTOMER_LIST,RECEIVE_CUSTOMER_LIST} from './actionsTypes'

export const onRequestCustomerList = (reqInfo) => (
    {type: REQUEST_CUSTOMER_LIST,
      reqInfo
    }
  );

export const onReceiveCustomerList = (dateList) => ({
  type: RECEIVE_CUSTOMER_LIST,
  dateList
});

