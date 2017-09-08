/**
 * @description: 企业客户数据处理
 * @author: xzqiang
 * @create: 2017/5/24
 */
import {REQUEST_BUSINESS_CUSTOMER,RECEIVE_BUSINESS_CUSTOMER} from '../actions/actionsTypes';

const init = {
  isFetching: false,
	searchV:"",
	ownerScope:"mine",
  items: {
    success:true,
    businessCustomerList:[]
  }
};

export default function businessCustomer(state=init, action) {
  switch (action.type) {
    case REQUEST_BUSINESS_CUSTOMER:
      return {
        ...state,
				ownerScope:action.reqInfo.enterpriseRecord.ownerScope,
				searchV:action.reqInfo.enterpriseRecord.custName,
        isFetching: true
      };
    case RECEIVE_BUSINESS_CUSTOMER:
      return {
        ...state,
        isFetching: false,
        items: {
          ...action.posts,
          businessCustomerList:action.posts.businessCustomerList||state.items.businessCustomerList
        }
      };
    default:
      return state
  }
}
