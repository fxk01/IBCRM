/**
 * Created by K0170003 on 2017/7/25.
 * 联系人详情
 */

import React from 'react'
import { bindActionCreators } from 'redux'
import '../../css/contactDetails.less'
import * as SaveNewContactsAction from '../actions/SaveNewContactsAction'
import * as NewContactsActions from '../actions/NewContactsTypeActions'
import * as ContactsDe from '../actions/ContactsDe'
import * as TitleAction from '../actions/TitleAction'
import EventEmitter from 'events';
import { List, InputItem, TextareaItem, Switch, Picker, Toast, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { createForm } from 'rc-form';
import { userInfo } from '../userInfo'

let emitter = new EventEmitter;

const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: '#fff'}}
  >
    <div style={{ display: 'flex', height: '0.9rem', lineHeight: '0.9rem' }}>
      <div className="wd4Rem">
        {props.name}
      </div>
      <div style={{ width: '23rem'}}>{!props.finalUserData ? props.contactsTypeTf : props.finalUserData}</div>
      <div style={{ textAlign: 'right', color: '#888'}}>
        <Icon className="icon" type={require("../../img/svg/ui-xiangyou.svg")} />
      </div>
    </div>
  </div>
);

let arr;

class SaveDetailsWrapperNav extends React.Component {
  render() {
    return(
      <div onClick={()=>{
        emitter.emit('saveContactsDeClick');
      }}>
        保存
      </div>
    )
  }
}

class ContactDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactsTypeItems: [],
      finalUserData: '',
      contactName: '',
      positionName: '',
      custName: '',
      email: '',
      isMain: '',
      industry: '',
      mobile: '',
      phone: '',
      contactsType: '',
      fax: '',
      QQ: '',
      remark: '',
    }
  }

  componentDidMount(){
    let dataId = this.parseURL('dataId');
    this.props.newContactsActions.onRequestNewContactsType({});
    this.props.ContactsDe.onRequestContactsDeList({contactId: dataId});
    emitter.on('saveContactsDeClick',this.saveBtn);
  }

  componentWillMount() {
    this.props.titleAction.onTitleChange('联系人详情');
    emitter.removeListener('saveContactsDeClick',this.saveBtn);
  }

  componentWillReceiveProps(nextProps) {
    arr = nextProps.newContacts.items.newContactsType;
    let deList = nextProps.ContactsDeList.items.contactsDeList;
    for(let item in deList) {
      if(deList[item] === null){
        deList[item] = '';
      }
    }
    let tf, contactsTypeTf, remarkTf;
    (deList.isMain === 'y') ? tf = 'Y' : tf = 'N';
    (deList.contactsType === 'bondright') ? contactsTypeTf = '债券' : contactsTypeTf = '股权';
    (deList.remark === null || !deList.remark) ? remarkTf = '' : remarkTf = deList.remark;
    try {
      if(arr.length !== undefined && nextProps.ContactsDeList.items.contactsDeList !== undefined){
        this.setState({
          contactsTypeItems: arr,
          contactName: deList.contactName,
          positionName: deList.positionName,
          custName: deList.custName,
          email: deList.email,
          isMain: tf,
          industry: deList.industry,
          mobile: deList.mobile,
          phone: deList.phone,
          contactsType: contactsTypeTf,
          fax: deList.fax,
          qq: deList.qq,
          remark: remarkTf,
          createBy: deList.createBy,
          createTs: deList.createTs,
          createdContact: deList.createdContact,
          custId: deList.custId,
          custOwner: deList.custOwner,
          custOwnerContact: deList.custOwnerContact,
          custType: deList.custType,
          cust_category: deList.cust_category,
          frequency: deList.frequency,
          lable: deList.lable,
          lableId: deList.lableId,
          readOnlyflag: deList.readOnlyflag,
          team: deList.team,
        });
      } else {
        console.log('网络错误！！！');
      }
      if(this.props.saveNewContacts.isFetching && !nextProps.saveNewContacts.isFetching && nextProps.saveNewContacts.items.success){
        Toast.success("保存成功",1)
      }else if(this.props.saveNewContacts.isFetching && !nextProps.saveNewContacts.isFetching && !nextProps.saveNewContacts.items.success){
        Toast.offline(`${nextProps.saveNewContacts.items.message}`, 2);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  saveBtn = () => {
    let data = {
      "contactRecord": {
        "contactName": this.state.contactName,
        "positionName": this.state.positionName,
        "custName": this.state.custName,
        "contactId": this.parseURL('dataId'),
        "contactsType": this.state.contactsType,
        "email": this.state.email,
        "mobile": this.state.mobile,
        "phone": this.state.phone,
        "industry": this.state.industry,
        "isMain": this.state.isMain,
        "fax": this.state.fax,
        "qq": this.state.qq,
        "remark": this.state.remark,
        "createBy": this.state.createBy,
        "createTs": this.state.createTs,
        "createdContact": this.state.createdContact,
        "custId": this.state.custId,
        "custOwner": this.state.custOwner,
        "custOwnerContact": this.state.custOwnerContact,
        "custType": this.state.custType,
        "cust_category": this.state.cust_category,
        "frequency": this.state.frequency,
        "lable": this.state.lable,
        "lableId": this.state.lableId,
        "readOnlyflag": this.state.readOnlyflag,
        "team": this.state.team,
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

  submit = (val) => {
    this.setState({
      finalUserData: val[0],
    });
  };

  switchSubmit(checked) {
    if(checked === true){
      console.log(checked);
      this.setState({
        isMain: 'Y',
      })
    } else {
      this.setState({
        isMain: 'N',
      })
    }
  }

  render() {
    let tfBox;
    let arrItems, i ,l, arrData = [];
    (this.state.isMain === 'y') ? tfBox = true : tfBox = false;
    if(this.state.contactsTypeItems.length > 0){
      arrItems = this.state.contactsTypeItems;
      for(i = 0, l = arrItems.length; i <  l; i++){
        arrData.push(arrItems[i]['codeValueDesc'])
      }
    }
    const { getFieldProps } = this.props.form;
    return(
      <div className="contactDetails">
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
          >
            职位
          </InputItem>
          <InputItem
            clear
          >
            <div style={{ display: 'flex', lineHeight: '0.45rem' }}>
              <div className="wd4Rem">
                所属客户
              </div>
              <div style={{ width: '23rem', overflowX: 'scroll' }}>
                {this.state.custName}
              </div>
              <div style={{ textAlign: 'right', color: '#888'}}>
                <Icon className="icon" type={require('../../img/svg/ui-xiangyou.svg')}/>
              </div>
            </div>
          </InputItem>
          <InputItem
            {...getFieldProps('focusEm')}
            clear
            value={this.state.email}
            onChange = {(value) => {this.setState({email: value})}}
          >
            Email
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
              {...getFieldProps('Switch1', {initialValue: tfBox, valuePropName: 'checked',})}
              onClick={this.switchSubmit.bind(this)}
            />}
            >
            </List.Item>
          </InputItem>
          <InputItem
            {...getFieldProps('focusHypH')}
            clear
            value={this.state.industry}
            onChange = {(value) => {this.setState({industry: value})}}
          >
            行业偏好
          </InputItem>
          <InputItem
            {...getFieldProps('focusSj')}
            clear
            value={this.state.mobile}
            onChange = {(value) => {this.setState({mobile: value})}}
          >
            手机
          </InputItem>
          <InputItem
            {...getFieldProps('focusGdDh')}
            clear
            value={this.state.phone}
            onChange = {(value) => {this.setState({phone: value})}}
          >
            固定电话
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
                  contactsTypeTf={this.state.contactsType}
                />
              </Picker>
            </List>
          </InputItem>
          <InputItem
            {...getFieldProps('focusCz')}
            clear
            value={this.state.fax}
            onChange = {(value) => {this.setState({fax: value})}}
          >传真
          </InputItem>
          <InputItem
            {...getFieldProps('focusQq')}
            clear
            value={this.state.qq}
            onChange = {(value) => {this.setState({qq: value})}}
          >QQ
          </InputItem>
          <TextareaItem
            title="业务描述"
            autoHeight
            clear={true}
            value={this.state.remark}
            onChange = {(value) => {this.setState({remark: value})}}
          />
        </List>
      </div>
    )
  }
}

const ContactDetailsWrapper = createForm()(ContactDetails);

const mapStateToProps = state => ({
  title: state.crmTitle,
  newContacts: state.newContacts,
  ContactsDeList: state.ContactsDeList,
  saveNewContacts: state.saveNewContacts,
});

const mapDispatchToProps = dispatch => ({
  titleAction: bindActionCreators(TitleAction, dispatch),
  newContactsActions: bindActionCreators(NewContactsActions, dispatch),
  ContactsDe: bindActionCreators(ContactsDe, dispatch),
  saveNewContactsAction: bindActionCreators(SaveNewContactsAction, dispatch),
});

export const saveDetailsNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveDetailsWrapperNav);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactDetailsWrapper)