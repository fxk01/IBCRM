/**
 * xzqiang
 * Created by admin on 2017/5/10.
 */

import {REQUEST_CUSTOMER_LIST,RECEIVE_CUSTOMER_LIST} from '../actions/actionsTypes';

const init = {
  isFetching: false,
  customerName:'',
	ownerScope:"mine",
  visitDate:'',
  requestType:'customerName',
  items: {
    success:true,
    customerList:[]
  }
};

export default function customer(state=init, action) {
  switch (action.type) {
    case REQUEST_CUSTOMER_LIST:
      return {
        ...state,
        isFetching: true,
        customerName:action.reqInfo.visitRecord.customerName,
				ownerScope:action.reqInfo.visitRecord.createBy,
        visitDate:action.reqInfo.visitRecord.startDate,
				requestType:action.reqInfo.requestType
      };
    case RECEIVE_CUSTOMER_LIST:
      return {
        ...state,
        isFetching: false,
        items: {
          ...action.posts,
          customerList:action.posts.customerList||state.items.customerList
        }
      };
    default:
      return state
  }
}
