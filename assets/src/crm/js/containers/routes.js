/**
 * @description: 客户拜访界面
 * @author: xzqiang
 * @create: 2017-05-01 12:41:35
 */
import React from 'react';
import { Route, IndexRoute ,IndexRedirect} from 'react-router';
import {default as Main} from '../component/Main/Main';
import {default as SecondMain} from '../component/secondMain/secondMain';
import {
	App,
	Home,
	CustomerVisit,
	CustomerVisitNav,
	NotFoundPage,
	EtCustomer,
  	NewVisit,
    NewVisitNav,
	Contacts,
		NewContactsNav,
		saveDetailsNav,
	NewContacts,
  	ContactsNav,
  	VisitedRecord,
	VisitedRecordNav,
	Potential,
  	TabBarHt,
    TabNav,
	AddOppo,
	AddOppo_Nav,
	ContactDetails
} from './index';



export default (
	<Route path='/'  component={App}>
		<IndexRedirect to="/roadshow/ibcrm/etCustomer"/>
		<Route path='/roadshow/ibcrm' component={Main}>
			<Route path="index" components={{main:CustomerVisit, navBar:CustomerVisitNav}}/>
			<Route path="etCustomer" component={EtCustomer}/>
			<Route path="contacts" components={{main:Contacts, navBar:ContactsNav}}/>
			<Route path="potential" component={Potential}/>
			<Route path="cardScanning" component={EtCustomer}/>
		</Route>
		<Route path='/roadshow/ibcrm/act' component={SecondMain}>
			<Route path="newVisit" components={{main:NewVisit,navBar:NewVisitNav}} />
			<Route path="visitedRecord" components={{main:VisitedRecord,navBar:VisitedRecordNav}} />
			<Route path="newContacts" components={{main:NewContacts, navBar:NewContactsNav}} />
			<Route path="infoTab" components={{main:TabBarHt,navBar:TabNav}}/>
			<Route path="addOppo" components={{main:AddOppo,navBar:AddOppo_Nav}}/>
			<Route path="contactDetails" components={{main:ContactDetails, navBar:saveDetailsNav}}/>
		</Route>
		<Route path="/roadshow/ibcrm/customerMap" component={Home}/>
		<Route path="*" component={NotFoundPage}/>
	</Route>
);