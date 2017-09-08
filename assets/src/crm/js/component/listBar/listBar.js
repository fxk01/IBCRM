/**
 * Created by admin on 2017/5/10.
 * xzqiang
 */
import React from 'react'
import './listBar.less'

export class ListBar extends React.Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div className="listBar">
        {this.props.children}
      </div>
    )
  }
}

export class ListBar_item extends React.Component{
  constructor(){
    super()
  }
  static defaultProps = {
    icon:'',
    title:'文天学院'
  };
  render(){
    return (
      <div className="listBar_item">
          <div className="listBar_item_box">
            <div className="listBar_item_icon">
              <span className={"iconfont "+this.props.icon}>
              </span>
            </div>
            <div className="listBar_item_title">
              {this.props.title}
            </div>
          </div>
      </div>
    )
  }
}