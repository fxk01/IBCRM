/**
 * Created by baizilin on 2017/6/6.
 * likaiming
 */
import { REQUEST_BUSINESS_CONTACTS, RECEIVE_BUSINESS_CONTACTS } from './actionsTypes'

export const onRequestContactsList = (data) => ({
  type: REQUEST_BUSINESS_CONTACTS,
  data
});

export const onReceiveContactsList = (dateList) => ({
  type: RECEIVE_BUSINESS_CONTACTS,
  dateList
});