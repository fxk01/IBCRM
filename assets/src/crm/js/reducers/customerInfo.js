/**
 * @description: 企业客户-基础信息reduce
 * @author: zy
 * @create: 2017/6/7
 */
import {REQUEST_CUSTOMER_INFO,RECEIVE_CUSTOMER_INFO} from '../actions/actionsTypes';

const init = {
  isFetching: false,
  items: {
    success:true,
    customerInfoList:[]
  }
};
export default function customerInfo(state=init, action) {
  switch (action.type) {
    case REQUEST_CUSTOMER_INFO:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_CUSTOMER_INFO:
      return {
        ...state,
        isFetching: false,
        items: action.posts
      };
    default:
      return state
  }
}
