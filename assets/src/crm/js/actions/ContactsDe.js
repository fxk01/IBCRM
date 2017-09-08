/**
 * Created by K0170003 on 2017/7/27.
 * likaiming
 */

import { REQUEST_CONTACTS_DE, RECEIVE_CONTACTS_DE } from './actionsTypes'

export const onRequestContactsDeList = (data) => ({
  type: REQUEST_CONTACTS_DE,
  data,
});

export const onReceiveContactsDeList = (contactsDeList) => ({
  type: RECEIVE_CONTACTS_DE,
  contactsDeList,
});
