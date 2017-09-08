/**
 * @description: 企业客户-过往交易reduce
 * @author: zy
 * @create: 2017/6/7
 */
import {REQUEST_TRADE_HISTORY,RECEIVE_TRADE_HISTORY} from '../actions/actionsTypes';

const init = {
  isFetching: false,
  items: {
    success:true,
    tradeHistoryList:[]
  }
};
export default function tradeHistory(state=init, action) {
  switch (action.type) {
    case REQUEST_TRADE_HISTORY:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_TRADE_HISTORY:
      return {
        ...state,
        isFetching: false,
        items: action.posts
      };
    default:
      return state
  }
}
