/**
 * Created by baizilin on 2017/6/22.
 * likaiming
 */

import { REQUEST_NEW_CONTACTS_SAVE, RECEIVE_NEW_CONTACTS_SAVE } from './actionsTypes'

export const onRequestSaveNewContacts = (data) => ({
  type: REQUEST_NEW_CONTACTS_SAVE,
  data
});

export const onReceiveSaveNewContacts = (saveNewContactsList) => ({
  type: RECEIVE_NEW_CONTACTS_SAVE,
  saveNewContactsList
});
