/**
 * @description: 企业客户-客户拜访reduce
 * @author: zy
 * @create: 2017/6/7
 */
import {REQUEST_TAB_VISIT_LIST,RECEIVE_TAB_VISIT_LIST,CLEAR_TAB_VISTI_LIST} from '../actions/actionsTypes';

const init = {
  isFetching: false,
  items: {
    success:true,
    tabVisitList:[]
  }
};

export default function tabVisit(state=init, action) {
  switch (action.type) {
    case REQUEST_TAB_VISIT_LIST:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_TAB_VISIT_LIST:
      return {
        ...state,
        isFetching: false,
        items: {
          ...action.posts,
            tabVisitList:action.posts.tabVisitList||state.items.tabVisitList
        }
      };
      case CLEAR_TAB_VISTI_LIST:
        console.log("in")
          return {
              ...state,
              isFetching: false,
              items: {
                  ...action.posts,
                  tabVisitList:null
              }
          };
    default:
      return state
  }
}
