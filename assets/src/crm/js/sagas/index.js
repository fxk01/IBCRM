/*
* xzqiang
* */

// saga 模块化引入
import { fork } from 'redux-saga/effects'
import {watchCustomerRequest} from './customer'
import {watchBusinessOpportunityRequest} from './businessOppo'
import {watchBusinessCustomerRequest} from './businessCustomer'
import { watchContactsRequest } from  './contacts'
import { watchTradeHistoryRequest } from  './trandeHistory'
import {watchCustomerInfoRequest} from './customerInfo'
import {watchTabVisitRequest} from './tabVisit'
import {watchVisitRecordInfoRequest} from './visitRecordInfo'
import {watchCustomerNameRequest} from './customerName'
import {watchVisitObjectRequest} from './visitObject'
import {watchNewVisitRequest} from './newVisit'
import {watchEmpRequest} from './emp'
import { watchNewContactsRequest } from  './newContacts'
import { watchNewContactsUserTypeRequest } from  './newContactsUserList'
import { watchSaveContactsRequest } from  './saveContacts'
import { watchContactsTabRequest } from  './contactsTab'
import { watchOpportunityByVisitRequest } from  './oppoByVisit'
import {watchAddOpportunityRequest} from "./addOpportunity"
import {watchContactsDeRequest} from "./contactsDe"

// 单一进入点，一次启动所有 Saga
export default function* rootSaga() {
  yield [
    fork(watchCustomerRequest),
    fork(watchBusinessOpportunityRequest),
    fork(watchBusinessCustomerRequest),
    fork(watchContactsRequest),
    fork(watchTradeHistoryRequest),
    fork(watchCustomerInfoRequest),
    fork(watchTabVisitRequest),
    fork(watchVisitRecordInfoRequest),
    fork(watchCustomerNameRequest),
    fork(watchVisitObjectRequest),
    fork(watchNewVisitRequest),
    fork(watchEmpRequest),
    fork(watchNewContactsRequest),
    fork(watchNewContactsUserTypeRequest),
    fork(watchSaveContactsRequest),
    fork(watchContactsTabRequest),
    fork(watchOpportunityByVisitRequest),
		fork(watchAddOpportunityRequest),
    fork(watchContactsDeRequest),
  ]
}