/**
 * Created by baizilin on 2017/5/31.
 */

import React from 'react'
import { Icon } from 'antd-mobile'
import "./ContactsButton.less"

export class ContactsButton extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    listChecked: [],
    showCheckBox: 0,
    onHandleClose:()=>{},
    onHandleSend:()=>{},
    onHandleOpen:()=>{},
    onHandleSearch:()=>{}
  };

  render() {
    return(
      <div className="contact-b">
        <div style={{width: '0.65rem'}}>
          {this.renderButton()}
        </div>
      </div>
    )
  }

  renderButton() {
      if (this.props.showCheckBox === 3) {
        return (
          <span style={{
            fontSize: '0.28rem',
          }} className="word" onTouchStart={this.props.onHandleSearch}>搜索</span>
        )
      }
  }
}