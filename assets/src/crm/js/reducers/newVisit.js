/**
 * @description:
 * @author: zy
 * @create: 2017/6/7
 */
import {REQUEST_NEW_VISIT,RECEIVE_NEW_VISIT} from '../actions/actionsTypes';

const init = {
  isFetching: false,
  items: {
    success:true,
    visitInfo:[]
  }
};
export default function newVisit(state=init, action) {
  switch (action.type) {
    case REQUEST_NEW_VISIT:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_NEW_VISIT:
      return {
        ...state,
        isFetching: false,
        items: action.posts
      };
    default:
      return state
  }
}
