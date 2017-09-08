/**
 * @description: tabBar页面
 * @author: zy
 * @create: 2017-06-07 12:41:35
 */

import React from 'react'
import { bindActionCreators } from 'redux'
import {Link} from "react-router"
import { connect } from 'react-redux'
import * as TitleAction from '../actions/TitleAction.js'
import * as CustomerInfoActive from '../actions/CustomerInfoAction.js';
import * as TabVisitActive from '../actions/TabVisitAction.js';
import * as TabNumActive from '../actions/TabNumActions.js';
import * as ContactsActive from '../actions/ContactsActioin';
import {TabBar,Icon} from 'antd-mobile';
import CustomerInfo from '../component/customerInfo/customerInfo'
import ContactsInfo from '../component/contactsInfo/contactsInfo'
import TabVisit from '../component/tabVisit/tabVisit'
import {Trade} from "../component/trade/Trade";




// import TabVisit from './CustomerVisit'

function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}



export class TabBarNav extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        if(this.props.tabNum===0){
            return(
                <div/>
            )
        }else if(this.props.tabNum===1){
            let typeNull = decodeURIComponent(parseURL(location).params.custType);
            let strNull;
            if(typeNull === 'null' && typeof typeNull === 'string') {
                strNull = '';
            } else {
                strNull = typeNull;
            }
            return(
                <Link
                    to={`${'/roadshow/ibcrm/act/newContacts?custName=' + decodeURIComponent(parseURL(location).params.custName) + '&custType='
                        + strNull + '&custId=' + window.location.href.split('#')[1]
                        }`}
                    onlyActiveOnIndex={true}
                >
                    <Icon style={{color:"white"}} type={require('../../img/svg/add.svg')}/>
                </Link>
            )
        }else if(this.props.tabNum===2){

            let list=this.props.customerInfo.items.customerInfoList;

            return(
                <Link to={{
                    pathname: '/roadshow/ibcrm/act/newVisit',
                    query: { custName: `${list.custName}`, custType: `${list.custType}`,custId:`${list.custId}` }
                }}>
                    <Icon style={{color:"white"}} type={require('../../img/svg/add.svg')}/>
                </Link>
            )
        }else {
            return(
                <div/>
            )
        }
    }
}




class TabBarHt extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
            hidden: false,
        };
    }

    componentWillMount(){
        let myURL = parseURL(location);
        let name=decodeURI(myURL.params.custName);
        name=name.substring(0,4)+"...";
        this.props.titleAction.onTitleChange(name);
    }
    render() {
        return (
            <TabBar className="tabBarHt"
                    unselectedTintColor="#888"
                    tintColor="#ff655d"
                    barTintColor="white"
                    hidden={this.state.hidden}
            >
                <TabBar.Item
                    title="基础信息"
                    key="基础信息"
                    icon={<img className="myIcon" src={require('../../img/tab1.png')}/>}
                    selectedIcon={<img className="myIcon" src={require('../../img/tab1_red.png')}/>}
                    selected={this.props.tabNum === 0}
                    onPress={() => {
                        this.props.tabNumAction.onChangeTab(0);
                    }}
                    data-seed="logId"
                >
                    <CustomerInfo
                        custId={location.hash.substring(1)}
                        customerInfo={this.props.customerInfo}
                        customerInfoAction={this.props.customerInfoAction}
                        tabVisitAction={this.props.tabVisitAction}
                    />
                </TabBar.Item>
                <TabBar.Item
                    icon={<img className="myIcon" src={require('../../img/tab2.png')}/>}
                    selectedIcon={<img className="myIcon" src={require('../../img/tab2_red.png')}/>}
                    title="联系人"
                    key="联系人"
                    selected={this.props.tabNum === 1}
                    onPress={() => {
                        this.setState({
                            selectedTab: 1,
                        });
                        this.props.tabNumAction.onChangeTab(1);
                    }}
                    data-seed="logId1"
                >
                    <ContactsInfo
                        custName={parseURL(location).params.custName}
                    />
                </TabBar.Item>
                <TabBar.Item
                    icon={<img className="myIcon" src={require('../../img/tab3.png')}/>}
                    selectedIcon={<img className="myIcon" src={require('../../img/tab3_red.png')}/>}
                    title="客户拜访"
                    key="客户拜访"

                    selected={this.props.tabNum === 2}
                    onPress={() => {
                        this.setState({
                            selectedTab: 2,
                        });
                        this.props.tabNumAction.onChangeTab(2);
                    }}
                >
                    <TabVisit
                        custId={location.hash.substring(1)}
                        /*tabVisit={this.props.tabVisit}
                        tabVisitAction={this.props.tabVisitAction}*/
                    />
                </TabBar.Item>
                <TabBar.Item
                    icon={<img className="myIcon" src={require('../../img/tab4.png')}/>}
                    selectedIcon={<img className="myIcon" src={require('../../img/tab4_red.png')}/>}
                    title="过往交易"
                    key="过往交易"
                    selected={this.props.tabNum === 3}
                    onPress={() => {
                        this.setState({
                            selectedTab: 3,
                        });
                        this.props.tabNumAction.onChangeTab(3);
                    }}
                >
                    <div style={{fontSize:"0.28rem",color:"#888", width:"100vw", paddingTop:"44vh", textAlign:"center"}}>暂无数据</div>
                </TabBar.Item>
            </TabBar>
        );
    }
}


const mapStateToProps = state => ({
    title:state.crmTitle,
    tabVisit:state.tabVisit,
    customerInfo:state.customerInfo,
    tabNum:state.tabNum,
    contactsInfo:state.contacts,
});

const mapDispatchToProps = dispatch => ({
    titleAction :bindActionCreators(TitleAction, dispatch),
    customerInfoAction:bindActionCreators(CustomerInfoActive, dispatch),
    tabVisitAction:bindActionCreators(TabVisitActive, dispatch),
    tabNumAction:bindActionCreators(TabNumActive, dispatch),
    contactsAction:bindActionCreators(ContactsActive, dispatch),
});

const TabNav=connect(
    mapStateToProps,
    mapDispatchToProps
)(TabBarNav);

export {TabNav}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabBarHt)