/**
 * @description: 企业客户-基础信息reduce
 * @author: zy
 * @create: 2017/6/7
 */
import {REQUEST_EMP,RECEIVE_EMP} from '../actions/actionsTypes';

const init = {
  isFetching: false,
  items: {
    success:true,
    empList:[]
  }
};
export default function emp(state=init, action) {
  switch (action.type) {
    case REQUEST_EMP:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_EMP:
      return {
        ...state,
        isFetching: false,
        items: action.posts
      };
    default:
      return state
  }
}
