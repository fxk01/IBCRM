/**
 * Created by baizilin on 2017/6/6.
 * likaiming
 */

import { REQUEST_BUSINESS_CONTACTS, RECEIVE_BUSINESS_CONTACTS } from '../actions/actionsTypes';

const init = {
  isFetching: false,
	searchV:"",
	ownerScope:"mine",
  items: {
    success: true,
    contactsList:[],
  }
};

export default function contacts(state=init, action) {
  switch (action.type) {
    case REQUEST_BUSINESS_CONTACTS:
      return {
        ...state,
				searchV:action.data.contactRecord.contactName||action.data.contactRecord.mobile,
				ownerScope:action.data.contactRecord.createBy,
        isFetching: true
      };
    case RECEIVE_BUSINESS_CONTACTS:
      return {
        ...state,
        isFetching: false,
        items: {
          ...action.posts,
          contactsList: action.posts.contactsList || state.items.contactsList
        },
      };
    default:
      return state
  }
}