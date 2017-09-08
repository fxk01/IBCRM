/**
 * @description: 客户拜访界面
 * @author: xzqiang
 * @create: 2017-05-05 12:41:35
 */

import React ,{Component} from  'react';
import {Link} from "react-router"
import {WhiteSpace, Toast,ListView,RefreshControl,Icon} from 'antd-mobile'
import {TimeLine , TimeLine_item,Line} from '../../component/timeLine/timeLine'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as tabVisitAction from '../../actions/TabVisitAction.js';
import  {default as Refresh} from '../../component/refresh/refresh'

/**
 * requestType
 * * customerName : 请求时使用客户公司名称过滤
 * * Date         : 请求时使用时间过滤
 */

let customerName,timer,abnormalConnect=0,resetList=0,requestType = "customerName";
function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

/**
 * @description: 客户拜访界面导航右侧配置
 * @author: zy
 * @create: 2017-05-17 10:13:10
 * @update: xzqiang (2017-05-17 10:13:10)
 */


class TabVisit extends  Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            refreshing: this.props.tabVisit.isFetching,
            value:'张三',
            popover_visible :0,
            dataSource: ds,
            data: this.props.tabVisit.items.tabVisitList,
            isLoading:true,
            hasMore:false
        };
    }


    componentDidMount(){
        if(!this.props.tabVisit.items.tabVisitList.length){
            // this.props.customerAction.onRequestCustomerList({start:0});
            this.setState({
                refreshing:true
            });
            abnormalConnect=1;
        }

        if(this.props.tabVisit.items.total && this.props.tabVisit.items.total  >= this.props.tabVisit.items.tabVisitList.length){
            this.setState({
                isLoading:false
            })
        }
    }

    componentWillUnmount(){
        clearTimeout(timer);
    }


    componentWillReceiveProps(nextProps){
        if(abnormalConnect === 1 && this.props.tabVisit.isFetching && !nextProps.tabVisit.isFetching && nextProps.tabVisit.items.success){
            Toast.hide();
            Toast.success('加载数据成功',1);
            abnormalConnect = 0;
        }else if(abnormalConnect === 1 && this.props.tabVisit.isFetching && !nextProps.tabVisit.isFetching && !nextProps.tabVisit.items.success){
            Toast.hide();
            Toast.fail('加载数据失败',1);
            abnormalConnect = 0;
        }

        const nextList = nextProps.tabVisit.items.tabVisitList;
        const oldList = this.props.tabVisit.items.tabVisitList;

        if (nextList !== oldList && nextProps.tabVisit.items.success) {
            this.setState({
                hasMore:(nextProps.tabVisit.items.total  - nextList.length ) > 0,
                refreshing: false,
                isLoading:false,
                data: nextProps.tabVisit.items.tabVisitList,
            });
        }
    }

    onHandleStart(key_v){
        timer = setTimeout(()=>{
            this.setState({
                popover_visible:key_v
            });
        },500);
    };

    onHandleEnd (){
        clearTimeout(timer);
    };

    clearPopve(){
        this.setState({
            popover_visible:0
        })
    };

    onHandleValChange(value){
        customerName = value;
    }

    /**
     * @description: 列表模板
     * @author: xzqiang
     * @create: 2017-06-06 11:19:40
     * @update: xzqiang (2017-06-06 11:19:40)
     */


    timeLine_item_header(date,detailTime){
        let weekDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        let year = date.getFullYear().toString().substr(2,2);
        let month = (date.getMonth()+1)<10?`0${date.getMonth()+1}`:date.getMonth()+1;
        let day = date.getDate()<10?`0${date.getDate()}`:date.getDate();
        return (
            <div className="headerBox clearfix">
                <div className="headerLeft">
                    <span className="month">{weekDay[date.getDay()]}</span><span className="day_year">{day}/{month}</span>
                </div>
                <div className="headerRight">
                    <span className="detailed_time">{detailTime}</span>
                </div>
            </div>
        )
    }

    timeLine_item_body(visitObject,customerName){
        return(
            <div className="bodyBox">
                <div className="visit_type">日常拜访</div>
                <div className="company_name">{customerName}</div>
            </div>
        )
    }

    /**
     * @description: （onRefresh）上拉重新装载数据、(onEndReached) 触底提前加载数据
     * @author: xzqiang
     * @create: 2017-05-16 13:08:40
     * @update: xzqiang (2017-05-16 13:08:40)
     */

    onRefresh(){
        resetList = 0;
        if(requestType === "customerName"){
            this.props.tabVisitAction.onRequestTabVisitList({
                visitRecord:{customerId:this.props.custId},
                start:0
            });
            /*this.props.tabVisitAction.onRequestTabVisitList({visitRecord:{customerName:this.props.custId||''},start:0});*/
        }
        requestType = "customerName";
        this.setState({ refreshing: true });
    };

    onEndReached(){
        if (this.state.isLoading || !(this.props.tabVisit.items.total  - this.props.tabVisit.items.tabVisitList.length)) {
            return;
        }
        this.setState({ isLoading: true });
        const listNum = this.props.tabVisit.items.tabVisitList.length;
        resetList = listNum;
        this.props.tabVisitAction.onRequestTabVisitList({visitRecord:{customerName:this.props.custId||''},start:listNum});
    };

    onHandleRefresh(){
        this.props.tabVisitAction.onRequestTabVisitList({visitRecord:{customerName:this.props.custId||''},start:0});
        Toast.loading('加载中...', 0);
        resetList = 0;
        abnormalConnect=1;
    }

    onHandleValChange(value){
        customerName = value;
    }


    render() {
        const { state } = this.props.tabVisit;
        const row = (rowData,selectID,rowID)=>{
            let date = new Date(Date.parse(rowData.visitDate.replace(/-/g,  "/")));
            return (
                <TimeLine_item
                    key={parseInt(rowID)}
                    key_v={parseInt(rowID)+1}
                    visitId={rowData.visitId}
                    touchS={this.onHandleStart.bind(this)}
                    touchE={this.onHandleEnd.bind(this)}
                    popover_visible={this.state.popover_visible}
                    phone={rowData.createdContact}
                    headerHtml={this.timeLine_item_header(date,rowData.detailTime)}
                    bodyHtml = {this.timeLine_item_body(rowData.visitObject,rowData.customerName)}
                />
            )
        };
        return (
            <div className="box" onTouchStart={()=>{this.clearPopve()}}>
                <WhiteSpace />
                {
                    this.props.tabVisit.items.success ?
                        ( //state.items.customerList.length > 0 &&
                            <TimeLine>
                                {
                                    <ListView ref="listView"
                                              dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                                              renderRow={row}
                                              renderBodyComponent={() => <MyBody />}
                                              renderHeader={() =>this.props.tabVisit.items.tabVisitList.length > 0 &&
                                              <div className="timeLine_top">
                                    <span id="triangle-up"
                                          style={{position:'absolute',
                                              top:'-0.3rem'
                                          }}>
                                    </span>
                                                  <Line type="topLine"/>
                                              </div>}
                                              renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
                                                  {this.state.isLoading ? '加载中...' : '加载完毕'}
                                              </div>}
                                              className="fortest"
                                              pageSize={6}
                                              initialListSize={6}
                                              scrollerOptions={{ scrollbars: true }}
                                              scrollRenderAheadDistance={200}
                                              scrollEventThrottle={20}
                                              onEndReachedThreshold={200}
                                        //onScroll={() => { console.log('scroll'); }}
                                              onEndReached={this.onEndReached.bind(this)}
                                              refreshControl={<RefreshControl
                                                  refreshing={this.state.refreshing}
                                                  onRefresh={this.onRefresh.bind(this)}
                                              />}
                                    />
                                }
                            </TimeLine>)
                        :
                        <Refresh
                            refreshClick = {this.onHandleRefresh.bind(this)}
                        />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    tabVisit:state.tabVisit,
});

const mapDispatchToProps = dispatch => ({

    tabVisitAction:bindActionCreators(tabVisitAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabVisit)

