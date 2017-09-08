/**
 * @description: 新建联系人
 * @author: likaiming
 * @create: 2017-05-18 10:34:07
 * @update: likaiming (2017-05-18 10:34:07)
 */

import React from 'react'
import { bindActionCreators } from 'redux'
import  '../../css/newContacts.less'
import { connect, Provider } from 'react-redux'
import * as TitleAction from '../actions/TitleAction.js'
import * as NewContactsActions from '../actions/NewContactsTypeActions'
import * as NewContactsUserTypeActions from '../actions/NewContactsUserTypeActions'
import PopCustomer from '../component/popCustomer/popCustomer'
import * as SaveNewContactsAction from '../actions/SaveNewContactsAction'
import { List, InputItem, TextareaItem, Switch, Picker, Toast, Popup, Icon } from 'antd-mobile'
import { store } from '../store/configureStore'
import EventEmitter from 'events';
import { userInfo } from '../userInfo'
import { createForm } from 'rc-form'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let emitter = new EventEmitter;
let arr, arrUserList, requestNum = 0;
let maskProps;
let removeClick;
if (isIPhone) {
    maskProps = {
        onTouchStart: e => e.preventDefault(),
    };
}
const CustomChildren = props => (
    <div
        onClick={props.onClick}
        style={{ backgroundColor: '#fff'}}
    >
      <div style={{ display: 'flex', height: '0.9rem', lineHeight: '0.9rem' }}>
        <div className="wd4Rem">
            {props.name}
        </div>
        <div style={{ width: '23rem'}}>{props.finalUserTypeData}{props.finalUserTypeData2}{props.finalUserData}</div>
        <div style={{ textAlign: 'right', color: '#888'}}>
            <Icon className="icon" type={require("../../img/svg/ui-xiangyou.svg")} />
        </div>
      </div>
    </div>
);

class SaveNewContactsNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestTrue: true,
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.saveNewContacts.isFetching && !nextProps.saveNewContacts.isFetching && nextProps.saveNewContacts.items.success){
            Toast.success("保存成功",1)
        }else if(this.props.saveNewContacts.isFetching && !nextProps.saveNewContacts.isFetching && !nextProps.saveNewContacts.items.success){
            Toast.offline(`${nextProps.saveNewContacts.items.message}`, 2);
        }
    }

    render() {
        return(
            <div onClick={()=>{
                emitter.emit('saveContactsClick');
            }}>
              保存
            </div>
        )
    }
}

class NewContacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactsTypeItems: [],
            contactsUserTypeItems: [],
            finalUserData: '',
            finalUserTypeData: '',
            finalUserTypeData2: '',
            contactName: '',
            positionName: '',
            custName: '',
            custId: '',
            mobile: '',
            phone: '',
            qq: '',
            email: '',
            custCategory: '',
            contactsType: '',
            industry: '',
            fax: '',
            isMain: '',
            remark: '',
            authName: '',
            customer: {custId: '', custType: '', custName: ''},
        };
    }

    componentWillMount() {
        this.props.titleAction.onTitleChange('新建联系人');
    }

    componentDidMount() {
        let NameYes = decodeURIComponent(this.parseURL('custName'));
        this.props.newContactsActions.onRequestNewContactsType({});
        this.props.newContactsUserTypeActions.onRequestNewContactCustomerType({});
        emitter.on('saveContactsClick',this.saveBtn);
        if(window.location.href.split("?")[1] === undefined){
            removeClick = this.custNameClick;
        } else {
            this.setState({
                customer: {
                    custId: decodeURIComponent(this.parseURL('custId')),
                    custType: decodeURIComponent(this.parseURL('custType')),
                    custName: NameYes,
                },
            });
            removeClick = false;
        }

    }

    componentWillUnmount(){
        emitter.removeListener('saveContactsClick',this.saveBtn);
    }

    componentWillReceiveProps(nextProps) {
        let contactsListArr = [];
        arr = nextProps.newContacts.items.newContactsType;
        arrUserList = nextProps.newContactsUserList.items.newContactsType;
        try {
            if(arr.length !== undefined && arrUserList.length !== undefined){
                arrUserList.forEach(function (value) {
                    contactsListArr.push({
                        value: value['codeValueDesc'],
                        label: value['codeValueDesc'],
                    })
                });
                this.setState({
                    contactsTypeItems: arr,
                    contactsUserTypeItems: contactsListArr,
                });
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    parseURL(urlParameter) {
        let _url = window.location.href.split("?")[1];
        if (_url != undefined) {
            let _index;
            let _arr = _url.split("&");
            for (let i = 0,
                     _len = _arr.length; i < _len; i++) {
                if (_arr[i].indexOf(urlParameter + "=") >= 0) {
                    _index = i;
                    break;
                } else {
                    _index = -1;
                }
            }
            if (_index >= 0) {
                let _key = _arr[_index].split("=")[1];
                return _key;
            }
        }
    }

    saveBtn = () => {
        let data = {
            "contactRecord": {
                "contactName": this.state.contactName,
                "positionName": this.state.positionName,
                "custName": this.state.customer["custName"],
                "custId": this.state.customer["custId"],
                "custType": this.state.customer["custType"],
                "contactsType": this.state.contactsType,
                "ecifId":"",
                "email": this.state.email,
                "mobile": this.state.mobile,
                "phone": this.state.phone,
                "industry": this.state.industry,
                "readOnlyflag":"",
                "authName": this.state.authName,
                "createTs":"",
                "contactId":"",
                "isMain": this.state.isMain,
                "fax": this.state.fax,
                "qq": this.state.qq,
                "remark": this.state.remark,
                "team":"",
                "frequency":"",
                "cust_category": this.state.custCategory,
                "createBy":""
            },
            "loginCode": userInfo.userCode,
            "deptName": ""
        };
        this.props.saveNewContactsAction.onRequestSaveNewContacts(data);
        if(
            this.state.contactName.length !== 0 || this.state.contactName.replace(/(^s*)|(s*$)/g, "").length !== 0 &&
            this.state.positionName.length !== 0 || this.state.positionName.replace(/(^s*)|(s*$)/g, "").length !== 0 &&
            this.state.mobile.length !== 0 || this.state.mobile.replace(/(^s*)|(s*$)/g, "").length !== 0 &&
            this.state.phone.length !== 0 || this.state.phone.replace(/(^s*)|(s*$)/g, "").length !== 0
        ) {
            Toast.loading('正在保存请稍后....', 0);
        }
    };

    submit = (val) => {
        this.setState({
            finalUserData: val[0],
            contactsType: val[0],
        });
    };

    submit2 = (val) => {
        this.setState({
            finalUserTypeData: val[0],
            custCategory: val[0],
        });
    };

    submit3 = (val) => {
        this.setState({
            finalUserTypeData2: val[0],
        });
    };

    custItemClick(obj){
        if(obj.custId !== this.state.customer['custId']) {
            this.setState({
                customer: obj
            });
        }
    }

    custNameClick = () => {
        Popup.show(
            <Provider store={store}>
                <PopCustomer
                    header="客户名称"
                    custItemClick={(obj) => {this.custItemClick(obj)}}
                    className="Popup" onClose={() => Popup.hide()}
                />
            </Provider>,
            {  animationType: 'slide-down', maskProps, maskClosable: false  });
    };

    render() {
        let arrItems, i ,l, arrData = [];
        if(this.state.contactsTypeItems[0]){
            arrItems = this.state.contactsTypeItems;
            for(i = 0, l = arrItems.length; i <  l; i++){
                arrData.push(arrItems[i]['codeValueDesc'])
            }
        }
        const { getFieldProps } = this.props.form;
        return (
            <div className="newContact">
              <List>
                <InputItem
                    {...getFieldProps('focusXm')}
                    clear
                    value={this.state.contactName}
                    onChange = {(value) => {this.setState({contactName: value})}}
                >
                  姓名
                </InputItem>
                <InputItem
                    {...getFieldProps('focusZw')}
                    clear
                    value={this.state.positionName}
                    onChange = {(value) => {this.setState({positionName: value})}}
                >职位</InputItem>
                {/*<Accordion defaultActiveKey="0" className="my-accordion">*/}
                  {/*<Accordion.Panel header="所属客户">*/}
                    {/*<List className="my-list">*/}
                        {/*<InputItem*/}
                          {/*{...getFieldProps('focusKhJc')}*/}
                          {/*clear*/}
                          {/*value={this.state.authName}*/}
                          {/*onChange = {(value) => {this.setState({authName: value})}}*/}
                      {/*>*/}
                        {/*客户简称*/}
                      {/*</InputItem>*/}
                        {/*<InputItem>*/}
                            {/*<List style={{ backgroundColor: 'white' }} className="picker-list">*/}
                                {/*<Picker*/}
                                    {/*data={this.state.contactsUserTypeItems}*/}
                                    {/*cols={1}*/}
                                    {/*onChange={this.submit2}*/}
                                    {/*className="forss"*/}
                                {/*>*/}
                                    {/*<CustomChildren*/}
                                        {/*arrow="horizontal"*/}
                                        {/*name="客户类型"*/}
                                        {/*srcImg={require("../../img/icon_date.png")}*/}
                                        {/*finalUserTypeData={this.state.finalUserTypeData}*/}
                                    {/*/>*/}
                                {/*</Picker>*/}
                            {/*</List>*/}
                        {/*</InputItem>*/}
                        {/*<InputItem>*/}
                        {/*<List style={{ backgroundColor: 'white' }} className="picker-list">*/}
                          {/*<Picker*/}
                              {/*data={[*/}
                                  {/*{*/}
                                      {/*value: '关键客户',*/}
                                      {/*label: '关键客户',*/}
                                  {/*}*/}
                              {/*]}*/}
                              {/*cols={1}*/}
                              {/*className="forss"*/}
                              {/*onChange={this.submit3}*/}
                          {/*>*/}
                            {/*<CustomChildren*/}
                                {/*arrow="horizontal"*/}
                                {/*name="企业客户类型"*/}
                                {/*srcImg={require("../../img/icon_date.png")}*/}
                                {/*finalUserTypeData2={this.state.finalUserTypeData2}*/}
                            {/*/>*/}
                          {/*</Picker>*/}
                        {/*</List>*/}
                      {/*</InputItem>*/}
                    {/*</List>*/}
                  {/*</Accordion.Panel>*/}
                {/*</Accordion>*/}
                  <InputItem
                      {...getFieldProps('focusKhMc')}
                      clear
                      value=""
                  >

                      <div style={{ display: 'flex', lineHeight: '0.45rem' }} onClick={removeClick}>
                          <div className="wd4Rem">
                              所属客户
                          </div>
                          <div style={{ width: '23rem', overflowX: 'scroll', paddingLeft: '0.35rem' }}>{this.state.customer['custName']}</div>
                          <div style={{ textAlign: 'right', color: '#888'}}>
                              <Icon className="icon" type={require('../../img/svg/ui-xiangyou.svg')}/>
                          </div>
                      </div>
                  </InputItem>
                  <InputItem
                    {...getFieldProps('focusEi')}
                    clear
                    value={this.state.email}
                    onChange = {(value2) => {this.setState({email: value2})}}
                >Email
                </InputItem>
                  <InputItem style={{
                      width: '100%',
                      display: 'block'
                  }}>
                      <span className="am-list-sfZy">是否重要</span>
                      <List.Item style={{
                          display: 'inline-block',
                          float: 'right',
                      }} extra={<Switch
                          {...getFieldProps('Switch1', {
                              initialValue: true,
                              valuePropName: 'checked',
                          })}
                          onClick={(checked) => {
                              let che;
                              checked == true ? che = 'Y' : che = 'N';
                              this.setState({isMain: che})
                          }}
                      />}
                      >
                      </List.Item>
                  </InputItem>
                  <InputItem
                        {...getFieldProps('focusHyBh')}
                        clear
                        value={this.state.industry}
                        onChange = {(value) => {this.setState({industry: value})}}
                    >行业偏好
                    </InputItem>
              </List>

              <List renderHeader={() => ''}>
                <InputItem
                    {...getFieldProps('focusSj')}
                    clear
                    value={this.state.mobile}
                    onChange = {(value) => {this.setState({mobile: value})}}
                >手机
                </InputItem>
                <InputItem
                    {...getFieldProps('focusDh')}
                    clear
                    value={this.state.phone}
                    onChange = {(value) => {this.setState({phone: value})}}
                >固定电话
                </InputItem>
                <InputItem>
                  <List style={{ backgroundColor: 'white' }} className="picker-list">
                    <Picker
                        data={[
                            {
                                value: arrData[0],
                                label: arrData[0],
                            },
                            {
                                value: arrData[1],
                                label: arrData[1],
                            }
                        ]}
                        cols={1}
                        className="forss"
                        onChange={this.submit}
                    >
                      <CustomChildren
                          arrow="horizontal"
                          name="联系人类型"
                          srcImg={require("../../img/icon_addMap.png")}
                          finalUserData={this.state.finalUserData}
                      />
                    </Picker>
                  </List>
                </InputItem>
              </List>

              <List renderHeader={() => ''}>
                <InputItem
                    {...getFieldProps('focusCz')}
                    clear
                    value={this.state.fax}
                    onChange = {(value) => {this.setState({fax: value})}}
                >传真
                </InputItem>
                <InputItem
                    {...getFieldProps('focusQQ')}
                    clear
                    value={this.state.qq}
                    onChange = {(value) => {this.setState({qq: value})}}
                >QQ
                </InputItem>
              </List>

              <List renderHeader={() => ''}>
                <TextareaItem
                    {...getFieldProps('focusMs')}
                    title="业务描述"
                    placeholder=""
                    autoHeight
                    value={this.state.remark}
                    onChange = {(value) => {this.setState({remark: value})}}
                />
              </List>
            </div>
        )
    }
}

const NewContactsWrapper = createForm()(NewContacts);

const mapStateToProps = state => ({
    title: state.crmTitle,
    newContacts: state.newContacts,
    newContactsUserList: state.newContactsUserList,
    saveNewContacts: state.saveNewContacts,
});

const mapDispatchToProps = dispatch => ({
    titleAction: bindActionCreators(TitleAction, dispatch),
    newContactsActions: bindActionCreators(NewContactsActions, dispatch),
    newContactsUserTypeActions: bindActionCreators(NewContactsUserTypeActions, dispatch),
    saveNewContactsAction: bindActionCreators(SaveNewContactsAction, dispatch),
});

export const NewContactsNav = connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveNewContactsNav);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewContactsWrapper)