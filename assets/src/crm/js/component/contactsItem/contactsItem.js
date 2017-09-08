/**
 * Created by baizilin on 2017/5/31.
 * likaiming
 */

import React from 'react'
import './contactsItem.less'
import { Checkbox, Icon } from 'antd-mobile';
import { browserHistory } from 'react-router'
const CheckboxItem = Checkbox.CheckboxItem;

export class ContactsItem extends React.Component {
  constructor(props) {
    super(props);
  }
	
	static defaultProps = {
		key_v: 0,
		checked: false,
		data:{
		},
		isOwn:true,
		onList2:()=>{},
	};

  onHandleClickList(){
    if(this.props.isOwn){
			browserHistory.push('/roadshow/ibcrm/act/ContactDetails?dataId=' + this.props.data.contactId);
    }
  }



  render() {
    return (
      <div
        className="ctList"
        data-id={this.props.data.contactId}
        onClick={this.onHandleClickList.bind(this)}
      >
        <CheckboxItem
          align="top"
          checked={this.props.checked}
          onChange={()=>{this.props.onList2(this.props.key_v)}}
        >
          <div
            className={this.props.className}
            // onTouchStart={this.props.touchS}
            // onTouchEnd={this.props.touchE}
            // onTouchMove={this.props.touchE}
          >
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
                }}>{this.props.data.contactName}</span>
                <span className="ct30px2">/</span>
                <a className="ct24px" href={`tel:${this.props.data.mobile}`}>{this.props.data.mobile}</a>
              </div>

              <div className="contactInformation">
                <span className="ct28InTi">{this.props.data.custName}</span>
              </div>

              <div className="contactTwoTi">
                <div className="couple" style={{
                  width: '46vw',
                }}>
                  <span className="name">职位</span>
                  <span className="value wd280px">{this.props.data.positionName}</span>
                </div>

                <div className="couple mr05px" style={{
                  width: '25vw',
                }}>
                  <span className="name">负责人</span>
                  <span className="value">{this.props.data.createBy.replace(/,/g,'')}</span>
                </div>

                <div className="couple" style={{
                  width: '20vw',
                }}>
                  <span className="name">创建时间</span>
                  <span className="value">{this.props.data.createTs}</span>
                </div>

              </div>

              {/*<div className="contactNamePhone">*/}
                    {/*<Icon style={{*/}
                        {/*color: '#acc9da',*/}
                        {/*width: '0.32rem',*/}
                        {/*height: '0.32rem',*/}
                        {/*verticalAlign: 'middle',*/}
                    {/*}} className="icon" type={require("../../../img/svg/ui-yonghu.svg")} />*/}
                    {/*<span className="ct30px" style={{*/}
                        {/*color: '#444444',*/}
                    {/*}}>{this.props.data.createBy}</span>*/}
                    {/*<span className="ct30px2">/</span>*/}
                    {/*<a className="ct24px" href={`tel:${this.props.data.createdContact}`}>{this.props.data.createdContact}</a>*/}
                {/*</div>*/}
            </div>
          </div>
        </CheckboxItem>
      </div>
    );
  }
}