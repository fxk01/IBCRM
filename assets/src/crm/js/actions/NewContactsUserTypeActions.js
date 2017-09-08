/**
 * Created by baizilin on 2017/6/20.
 * likaiming
 */

import { REQUEST_NEW_CONTACTS_USER_TYPE, RECEIVE_NEW_CONTACTS_USER_TYPE } from './actionsTypes'

export const onRequestNewContactCustomerType = (data) => ({
  type: REQUEST_NEW_CONTACTS_USER_TYPE,
  data
});

export const onReceiveNewContactCustomerType = (newContactCustomerList) => ({
  type: RECEIVE_NEW_CONTACTS_USER_TYPE,
  newContactCustomerList
});