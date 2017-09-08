/**
 * Created by baizilin on 2017/6/19.
 * 新建联系人
 * likaiming
 */

import { REQUEST_NEW_CONTACTS_TYPE, RECEIVE_NEW_CONTACTS_TYPE } from '../actions/actionsTypes';

const init = {
  isFetching: false,
  items: {
    success: true,
    newContactsType: {}
  }
};

export default function newContactsType(state=init, action) {
  switch (action.type) {
    case REQUEST_NEW_CONTACTS_TYPE:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_NEW_CONTACTS_TYPE:
      return {
        ...state,
        isFetching: false,
        items: action.newContactsType
      };
    default:
      return state
  }
}