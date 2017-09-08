/**
 * Created by admin on 2017/5/5.
 * xzqing
 */

import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Tour extends Component {
  render() {
    return (
      <div className="center-center-column" style={{height: '100vh',width:'100vw'}}>
        <span className="font-26">404!页面没有找到，请</span>
        <div className="font-26">404!页面没有找到，请</div>
        <div className="font-26">404!页面没有找到，请</div>
        <div className="font-26">404!页面没有找到，请</div>
        <div className="font-26">404!页面没有找到，请</div>
        <div className="font-26">404!页面没有找到，请</div>
        <div className="font-26">404!页面没有找到，请</div>
        <div className="font-26">404!页面没有找到，请</div>
        <Link to="/roadshow/ibcrm/customerVisit" className="font-36 main-color">返回首页1</Link>
      </div>
    )
  }
}