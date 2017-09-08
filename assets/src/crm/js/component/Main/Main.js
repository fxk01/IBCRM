/**
 * Created by admin on 2017/5/8.
 */

import React,{ Component } from 'react';
import {default as Basic} from '../basic/basic';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Main extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const {state,main, navBar, children} = this.props;
    if(children){
      return (
        <Basic title={state}>
          <ReactCSSTransitionGroup
            transitionName="main"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {React.cloneElement(children, {
              key: location.pathname
            })}
          </ReactCSSTransitionGroup>
        </Basic>
      );
    }else{
      return (
        <Basic title={state} navBar={navBar}>
          <ReactCSSTransitionGroup
            transitionName="main"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {React.cloneElement(main, {
              key: location.pathname
            })}
          </ReactCSSTransitionGroup>
        </Basic>
      );
    }
  }
}

const mapStateToProps = state => ({
  state:state.crmTitle
});

export default connect(
  mapStateToProps
)(Main);
