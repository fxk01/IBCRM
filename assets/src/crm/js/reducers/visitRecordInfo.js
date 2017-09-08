/**
 * @description: 客户拜访-拜访记录 reduce
 * @author: zy
 * @create: 2017/6/7
 */
import {REQUEST_VISIT_RECORD_INFO,RECEIVE_VISIT_RECORD_INFO} from '../actions/actionsTypes';

const init = {
  isFetching: false,
  items: {
    success:true,
    info:[]
  }
};
export default function visitRecordInfo(state=init, action) {
  switch (action.type) {
    case REQUEST_VISIT_RECORD_INFO:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_VISIT_RECORD_INFO:
      return {
        ...state,
        isFetching: false,
        items: action.posts
      };
    default:
      return state
  }
}
