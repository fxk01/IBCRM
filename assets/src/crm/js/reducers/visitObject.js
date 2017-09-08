/**
 * @description: 企业客户-基础信息reduce
 * @author: zy
 * @create: 2017/6/7
 */
import {REQUEST_VISIT_OBJECT,RECEIVE_VISIT_OBJECT} from '../actions/actionsTypes';

const init = {
  isFetching: false,
  items: {
    success:true,
    nameList:[]
  }
};
export default function visitObject(state=init, action) {
  switch (action.type) {
    case REQUEST_VISIT_OBJECT:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_VISIT_OBJECT:
      return {
        ...state,
        isFetching: false,
        items: action.posts
      };
    default:
      return state
  }
}
