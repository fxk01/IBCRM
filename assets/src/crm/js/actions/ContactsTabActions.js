/**
 * Created by baizilin on 2017/6/26.
 * likaiming
 */

import { REQUEST_CONTACTS_TAB, RECEIVE_CONTACTS_TAB } from './actionsTypes'

export const onRequestContactsTab = (data) => ({
  type: REQUEST_CONTACTS_TAB,
  data
});

export const onReceiveContactsTab = (newContactsType) => ({
  type: RECEIVE_CONTACTS_TAB,
  newContactsType
});