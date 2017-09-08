import { combineReducers } from 'redux'
import counter from './counter'
import customer from './customer'
import crmTitle  from './crmTitle'
import businessOppo from './businessOppo'
import businessCustomer from './businessCustomer'
import contacts from './contacts'
import tradeHistory from './tradeHistory'
import customerInfo from './customerInfo'
import tabVisit from './tabVisit'
import tabNum from './tabNum'
import visitRecordInfo from './visitRecordInfo'
import customerName from './customerName'
import visitObject from './visitObject'
import newVisit from './newVisit'
import emp from './emp'
import newContacts from './newContacts'
import newContactsUserList from './newContactsUserType'
import saveNewContacts from './saveNewContacts'
import contactsTab from './contactsTab'
import oppoByVisit from './OppoByVisit'
import addOpportunity from './addOpportunity'
import ContactsDeList from './contactsDe'

const rootReducer = combineReducers({
  counter,
  customer,
  contacts,
  crmTitle,
  businessOppo,
  businessCustomer,
  tradeHistory,
  customerInfo,
  tabVisit,
  tabNum,
  visitRecordInfo,
  customerName,
  visitObject,
  newVisit,
  emp,
  newContacts,
  newContactsUserList,
  saveNewContacts,
  contactsTab,
  oppoByVisit,
	addOpportunity,
  ContactsDeList,
});

export default rootReducer;
