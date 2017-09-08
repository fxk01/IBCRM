/**
 * Created by baizilin on 2017/6/22.
 * likaiming
 */

import { REQUEST_NEW_CONTACTS_SAVE, RECEIVE_NEW_CONTACTS_SAVE } from '../actions/actionsTypes';

const init = {
  isFetching: false,
  items: {
    success: false,
    saveContactsList: {}
  }
};

export default function saveNewContacts(state=init, action) {
  switch (action.type) {
    case REQUEST_NEW_CONTACTS_SAVE:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_NEW_CONTACTS_SAVE:
      return {
        ...state,
        isFetching: false,
        items: action.saveContactsList
      };
    default:
      return state
  }
}