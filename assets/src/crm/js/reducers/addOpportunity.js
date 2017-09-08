/**
 * @description: 企业客户数据处理
 * @author: xzqiang
 * @create: 2017/5/24
 */
import {REQUEST_ADD_OPPORTUNITY,RECEIVE_ADD_OPPORTUNITY,RESET_ADD_OPPORTUNITY_STATE} from '../actions/actionsTypes';

const init = {
	isFetching: false,
	items: {
		success:false,
		message:{}
	}
};

export default function addOpportunity(state=init, action) {
	switch (action.type) {
		case REQUEST_ADD_OPPORTUNITY:
			return {
				...state,
				isFetching: true
			};
		case RECEIVE_ADD_OPPORTUNITY:
			return {
				...state,
				isFetching: false,
				items:{
					...action.posts
				}
			};
		case RESET_ADD_OPPORTUNITY_STATE:
			return {
				...state,
				items:{
					success:false
				}
			};
		default:
			return state
	}
}
