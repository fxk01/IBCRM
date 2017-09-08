/**
 * @description: 二级页面的父级route
 * @author: xzqiang
 * @create: 2017/5/17
 */

import React from  'react';
import createHistory from 'history/createBrowserHistory';
import { NavBar, Icon } from  'antd-mobile';
import './secondBasic.less';

const history = createHistory();

export  default class SecondMain extends React.Component{
  constructor(){
    super();
  }

  static defaultProps = {
    navBar:''
  };

  render(){
    const {title,children} = this.props;
    return (
      <div className="secondBox">
        <NavBar className="secondNav"
                mode="light"
                onLeftClick={() => history.go(-1)}
                rightContent={<span onClick={()=>{
                  console.log("save");
                }}>{this.props.navBar}</span>}
        >{title}</NavBar>
        {children}
      </div>
    );
  }
}
