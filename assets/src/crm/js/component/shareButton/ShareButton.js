/**
 * @description: 分享按钮
 * @author: zy
 * @create: 2017/5/17
 */

import React from 'react'
import {Icon} from 'antd-mobile'
import "./ShareButton.less"

// 分享按钮
export class ShareButton extends React.Component{
    constructor(props) {
        super(props);
    }

    static defaultProps={
      listChecked:[],
      showCheckBox:3,
      onHandleClose:()=>{},
      onHandleSend:()=>{},
      onHandleOpen:()=>{},
      onHandleSearch:()=>{}
    };

    render(){
        return(
            <div>
                <div className="shareButton">
                    {this.renderButton()}
                </div>
            </div>
        )
    }
    renderButton(){
      //关闭发送，始终显示搜索；
      return <span className="word" onTouchStart={this.props.onHandleSearch}>搜索</span>;
      if(this.props.showCheckBox===3){
        return (
          <span className="word" onTouchStart={this.props.onHandleSearch}>搜索</span>
        )
      }
        if(this.props.showCheckBox !== 2){
            return(
              <span onTouchStart={this.props.onHandleOpen}>
                <Icon type={require('../../../img/svg/sendOut.svg')}/>
              </span>
            )
        }else{
            if(this.props.listChecked.length){
                return(
                    <span className="word" onTouchStart={this.props.onHandleSend}>发送</span>
                )
            }else{
                return(
                    <span className="word" onTouchStart={this.props.onHandleClose}>关闭</span>
                )
            }
        }
    }
}