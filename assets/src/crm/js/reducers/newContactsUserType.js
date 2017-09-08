/**
 * Created by baizilin on 2017/6/20.
 * likaiming
 */
/**
 * Created by baizilin on 2017/6/19.
 * 新建联系人
 * likaiming
 */

import { REQUEST_NEW_CONTACTS_USER_TYPE, RECEIVE_NEW_CONTACTS_USER_TYPE } from '../actions/actionsTypes';

const init = {
  isFetching: false,
  items: {
    success: true,
    newContactsTypeList: {}
  }
};

export default function newContactsUserListType(state=init, action) {
  switch (action.type) {
    case REQUEST_NEW_CONTACTS_USER_TYPE:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_NEW_CONTACTS_USER_TYPE:
      return {
        ...state,
        isFetching: false,
        items: action.newContactsTypeList
      };
    default:
      return state
  }
}