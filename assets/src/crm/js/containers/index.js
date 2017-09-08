/**
 * @description: 统一组件导出
 * @author: xzqiang
 * @create: 2017-1-17 12:41:35
 */
export {default as App} from './App';

// 简单
export { default as Home } from './Home';

// 404
export { default as NotFoundPage } from './404.js';

//客户拜访
export {default as CustomerVisit, CustomerVisitNav} from './CustomerVisit';

//企业客户
export {default as EtCustomer} from './EtCustomer';

//新建拜访
export {default as NewVisit,NewVisitNav} from './NewVisit';

//联系人
export {default as Contacts, ContactsNav} from './Contacts';

//新建联系人
export {default as NewContacts, NewContactsNav} from './NewContacts';

//拜访记录
export {default as VisitedRecord, VisitedRecordNav} from './VisitedRecord';

//潜在业务机会
export {default as Potential} from './Potential.js';

//个人信息Tab页
export {default as TabBarHt,TabNav} from './TabBarHt.js';

//添加潜在业务机会
export {default as AddOppo,AddOppo_Nav} from "./AddOppo"

//联系人详情
export {default as ContactDetails, saveDetailsNav} from "./ContactDetails"