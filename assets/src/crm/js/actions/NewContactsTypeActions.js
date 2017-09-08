/**
 * Created by baizilin on 2017/6/19.
 * likaiming
 */

import { REQUEST_NEW_CONTACTS_TYPE, RECEIVE_NEW_CONTACTS_TYPE } from './actionsTypes'

export const onRequestNewContactsType = (data) => ({
  type: REQUEST_NEW_CONTACTS_TYPE,
  data
});

export const onReceiveNewContactsType = (newContactsType) => ({
  type: RECEIVE_NEW_CONTACTS_TYPE,
  newContactsType
});