/**
 * Created by admin on 2017/5/5.
 * xzqing
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux'
import { createForm } from 'rc-form';
import * as countActions from '../actions/CounterActions'

 import PopEmp from '../component/popEmp/popEmp'



class Home extends Component {
  constructor ( props , context ) {
    super ( props , context ) ;
    this.state = {

    };
  }
	render() {
        return(
            <div className="am-popup-body">
                <PopEmp/>
            </div>
        )
	}
}

const mapStateToProps = state => ({
	state: state.counter
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(countActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);