/**
 * @description: 企业客户action
 * @author: xzqiang
 * @create: 2017/5/24
 */

import {REQUEST_ADD_OPPORTUNITY,RECEIVE_ADD_OPPORTUNITY,RESET_ADD_OPPORTUNITY_STATE} from './actionsTypes'

export const onRequestAddOpportunity = (reqInfo) => ({
	type: REQUEST_ADD_OPPORTUNITY,
	reqInfo
});

export const onReceiveAddOpportunity = (dateList) => ({
	type: RECEIVE_ADD_OPPORTUNITY,
	dateList
});

export const onResetState = () => ({
	type:RESET_ADD_OPPORTUNITY_STATE
});

