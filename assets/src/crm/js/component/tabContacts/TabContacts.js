/**
 * Created by baizilin on 2017/6/22.
 * likaiming
 */

import React from 'react'
import './TabContacts.less'
import { Checkbox, Icon } from 'antd-mobile';
import { browserHistory } from 'react-router'
const CheckboxItem = Checkbox.CheckboxItem;

export class TabContacts extends React.Component {
  constructor(props){
    super(props);
  }

  onHandleClickList(){
    console.log(111);
    browserHistory.push('/roadshow/ibcrm/act/ContactDetails?dataId=' + this.props.rowData.contactId);
  }

  render(){
    return (
      <div
        className="ctList"
        data-id={this.props.rowData.contactId}
        onClick={this.onHandleClickList.bind(this)}
      >
        <CheckboxItem align="top">
          <div className="view">
            <div className="contactNamePhone">
              <Icon style={{
                color: '#acc9da',
                width: '0.32rem',
                height: '0.32rem',
                verticalAlign: 'middle',
              }} className="icon" type={require("../../../img/svg/ui-yonghu.svg")} />
              <span className="ct30px" style={{
                color: '#444444',
              }}>{this.props.rowData.contactName}</span>
              <span className="ct30px2">/</span>
              <a className="ct24px" href={`tel:${this.props.rowData.mobile}`}>{this.props.rowData.mobile}</a>
            </div>

            <div className="contactInformation">
              <span className="ct28InTi">{this.props.rowData.custName}</span>
            </div>

            <div className="contactTwoTi">
              <div className="couple" style={{
                width: '46vw',
              }}>
                <span className="name">职位</span>
                <span className="value wd280px">{this.props.rowData.positionName}</span>
              </div>

              <div className="couple mr05px" style={{
                width: '25vw',
              }}>
                <span className="name">负责人</span>
                <span className="value">{this.props.rowData.createBy.replace(/,/g,'')}</span>
              </div>

              <div className="couple" style={{
                width: '20vw',
              }}>
                <span className="name">创建时间</span>
                <span className="value">{this.props.rowData.createTs}</span>
              </div>
            </div>
          </div>
        </CheckboxItem>
      </div>
    )
  }
}