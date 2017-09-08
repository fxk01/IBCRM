/**
 * @description: 企业客户-基础信息reduce
 * @author: zy
 * @create: 2017/6/7
 */
import {REQUEST_CUSTOMER_NAME,RECEIVE_CUSTOMER_NAME} from '../actions/actionsTypes';

const init = {
  isFetching: false,
  items: {
    success:true,
    nameList:[]
  }
};
export default function customerName(state=init, action) {
  switch (action.type) {
    case REQUEST_CUSTOMER_NAME:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_CUSTOMER_NAME:
      return {
        ...state,
        isFetching: false,
        items: action.posts
      };
    default:
      return state
  }
}
