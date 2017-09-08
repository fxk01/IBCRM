/**
 * Created by baizilin on 2017/6/26.
 * likaiming
 */

import { REQUEST_CONTACTS_TAB, RECEIVE_CONTACTS_TAB } from '../actions/actionsTypes';

const init = {
    isFetching: false,
    items: {
        success: true,
        contactsTabList: {},
    }
};

export default function contactsTab(state=init, action) {
    switch (action.type) {
        case REQUEST_CONTACTS_TAB:
            return {
                ...state,
                isFetching: false,
            };
        case RECEIVE_CONTACTS_TAB:
            return {
                ...state,
                isFetching: true,
                items: action.posts,
            };
        default:
            return state
    }
}