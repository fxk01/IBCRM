/**
 * Created by K0170003 on 2017/7/27.
 */

import { REQUEST_CONTACTS_DE, RECEIVE_CONTACTS_DE } from '../actions/actionsTypes';

const init = {
  isFetching: false,
  items: {
    success: true,
    contactsDeList:[],
  }
};

export default function contacts(state=init, action) {
  switch (action.type) {
    case REQUEST_CONTACTS_DE:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_CONTACTS_DE:
      return {
        ...state,
        isFetching: false,
        items: {
          ...action.posts,
          contactsDeList: action.posts.contactsDeList || state.items.contactsDeList
        },
      };
    default:
      return state
  }
}