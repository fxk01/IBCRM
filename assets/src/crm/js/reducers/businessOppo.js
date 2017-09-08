/**
 * @description: 业务机会数据请求reduce
 * @author: xzqiang
 * @create: 2017/5/22
 */
import {REQUEST_BUSINESS_OPPORTUNITY,RECEIVE_BUSINESS_OPPORTUNITY} from '../actions/actionsTypes';

const init = {
  isFetching: false,
	searchV:"",
	ownerScope:"mine",
  items: {
    success:true,
    businessOppoList:[]
  }
};
export default function businessOppo(state=init, action) {
  switch (action.type) {
    case REQUEST_BUSINESS_OPPORTUNITY:
      return {
        ...state,
				ownerScope:action.reqInfo.opptyRecord.ownerScope,
				searchV:action.reqInfo.opptyRecord.custName,
        isFetching: true
      };
    case RECEIVE_BUSINESS_OPPORTUNITY:
      return {
        ...state,
        isFetching: false,
        items: {
          ...action.posts,
          businessOppoList:action.posts.businessOppoList||state.items.businessOppoList
        }
      };
    default:
      return state
  }
}
