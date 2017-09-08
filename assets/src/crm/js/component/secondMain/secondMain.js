/**
 * @description: 二级页面的动画配置
 * @author: xzqiang
 * @create: 2017/5/17
 */

import React,{ Component } from 'react';
import {default as SecondBasic} from '../secondBasic/secondBasic';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

 class SecondMain extends Component{
  constructor(props){
    super(props);
  }
  render() {
    const {state,main, navBar, children} = this.props;
    if(children){
      return (
        <SecondBasic title={state}>
          <ReactCSSTransitionGroup
            transitionName="page"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {React.cloneElement(children, {
              key: location.pathname
            })}
          </ReactCSSTransitionGroup>
        </SecondBasic>
      );
    }else{
      return (
        <SecondBasic title={state} navBar={navBar}>
          <ReactCSSTransitionGroup
            transitionName="page"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {React.cloneElement(main, {
              key: location.pathname
            })}
          </ReactCSSTransitionGroup>
        </SecondBasic>
      );
    }
  }
}

const mapStateToProps = state => ({
  state:state.crmTitle
});

export default connect(
  mapStateToProps
)(SecondMain);

