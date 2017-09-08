/**
 * @description: 客户拜访界面
 * @author: xzqiang
 * @create: 2017-05-05 12:41:35
 */

import React ,{Component} from  'react';
import {Link} from "react-router"
import {WhiteSpace, Toast,ListView,RefreshControl,Icon} from 'antd-mobile'
import {default as SearchBar} from  '../component/searchBar/searchBar'
import {TimeLine , TimeLine_item,Line} from '../component/timeLine/timeLine'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CustomerAction from '../actions/CustomerActioin.js'
import * as TitleAction from '../actions/TitleAction.js'
import  {default as Refresh} from '../component/refresh/refresh'
import {sendPageMessage} from "../../../../middlewares/com"

/**
 * requestType
 * * customerName : 请求时使用客户公司名称过滤
 * * Date         : 请求时使用时间过滤
 */

let customerName,visitDate,timer,abnormalConnect=0,resetList=0,requestType = "customerName",isOwn="mine";
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
 * @author: xzqiang
 * @create: 2017-05-17 10:13:10
 * @update: xzqiang (2017-05-17 10:13:10)
 */

export class CustomerVisitNav extends Component{
  render(){
    return(
      <Link to="/roadshow/ibcrm/act/newVisit" onlyActiveOnIndex={true}>
        <Icon type={require('../../img/svg/ui-xinzeng2.svg')}/>
      </Link>
    )
  }
}


class CustomerVisit extends  Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      refreshing: this.props.state.isFetching,
      value:'张三',
      popover_visible :0,
      dataSource: ds,
      data: this.props.state.items.customerList,
      isLoading:true,
      hasMore:false
    };
  }

  componentWillMount(){
    this.props.titleAction.onTitleChange('客户拜访');
	}

  componentDidMount(){
		sendPageMessage("企业客户","客户拜访");
		//初始化属性值
		this.initializationValue(this.props.state);
    
    if(!this.props.state.items.customerList.length){
     // this.props.customerAction.onRequestCustomerList({start:0});
			this.setState({
				refreshing:true
			});
      abnormalConnect=1;
    }

    if(this.props.state.items.total && this.props.state.items.total  >= this.props.state.items.customerList.length){
      this.setState({
        isLoading:false
      })
    }
  }

  componentWillUnmount(){
    clearTimeout(timer);
  }


  componentWillReceiveProps(nextProps){
    //初始化属性值
    this.initializationValue(nextProps.state);
    if(abnormalConnect === 1 && this.props.state.isFetching && !nextProps.state.isFetching && nextProps.state.items.success){
      Toast.hide();
     // Toast.success('加载数据成功',1);
      abnormalConnect = 0;
    }else if(abnormalConnect === 1 && this.props.state.isFetching && !nextProps.state.isFetching && !nextProps.state.items.success){
      Toast.hide();
      Toast.fail('加载数据失败',1);
      abnormalConnect = 0;
    }

    const nextList = nextProps.state.items.customerList;
    const oldList = this.props.state.items.customerList;

    if (nextList !== oldList && nextProps.state.items.success) {
      this.setState({
        hasMore:(nextProps.state.items.total  - nextList.length ) > 0,
        refreshing: false,
        isLoading:false,
        data: nextProps.state.items.customerList,
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
  
  initializationValue(state){
		customerName = state.customerName || "";
		visitDate = state.visitDate || "";
		requestType = state.requestType;
  }

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
			this.props.customerAction.onRequestCustomerList({visitRecord:{customerName:customerName||'',createBy:isOwn},start:0,requestType:"customerName"});
    }else if(requestType === "Date"){
			this.props.customerAction.onRequestCustomerList({visitRecord:{customerName:'',startDate:visitDate,endDate:visitDate,createBy:isOwn},start:0,requestType:"Date"});
		}
    requestType = "customerName";
    this.setState({ refreshing: true });
  };

  onEndReached(){
    if (this.state.isLoading || !(this.props.state.items.total  - this.props.state.items.customerList.length)) {
      return;
    }
    this.setState({ isLoading: true });
    const listNum = this.props.state.items.customerList.length;
    resetList = listNum;
    if(requestType === "customerName"){
			this.props.customerAction.onRequestCustomerList({visitRecord:{customerName:customerName||'',createBy:isOwn},start:listNum,requestType:"customerName"});
		}else{
			this.props.customerAction.onRequestCustomerList({visitRecord:{customerName:'',startDate:visitDate,endDate:visitDate,createBy:isOwn},start:listNum,requestType:"Date"});
		}
  };

  onHandleRefresh(){
    this.props.customerAction.onRequestCustomerList({visitRecord:{customerName:customerName||'',createBy:isOwn},start:0,requestType:"customerName"});
    Toast.loading('加载中...', 0);
    resetList = 0;
    abnormalConnect=1;
  }

  onHandleValChange(value){
		requestType = "customerName";
    customerName = value;
  }

  onHandleSubmit(){
    if(this.props.state.items.customerList && this.props.state.items.customerList.length > 0){
      resetList = 0;
      this.refs.listView && this.refs.listView.refs.listview.scrollTo(0, 0);
      this.setState({ refreshing: true });
    }else{
      resetList = 0;
      this.props.customerAction.onRequestCustomerList({visitRecord:{customerName,createBy:isOwn},start:0,requestType:"customerName"});
      Toast.loading('加载中...', 0);
      abnormalConnect = 1;
    }
  }
  
  onHandleDataChange(val){
		this.refs.listView && this.refs.listView.refs.listview.scrollTo(0, 0);
		requestType = "Date";
		visitDate = val;
		this.setState({ refreshing: true });
  }
	
	onOwn(val){
		isOwn=val[0]
  }
  render() {
    const { state } = this.props;
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
         isOwn={state.ownerScope==="mine"}
         />
      )
    };
    return (
      <div className="box" onTouchStart={()=>{this.clearPopve()}}>
        <SearchBar
          onChange={this.onHandleValChange.bind(this)}
          onSubmit = {this.onHandleSubmit.bind(this)}
          onHandleDataChange = {this.onHandleDataChange.bind(this)}
          defaultV={requestType==="Date"?visitDate:customerName}
          showLeftValue={this.onOwn.bind(this)}
          defaultValue={state.ownerScope}
        />
        {
          state.items.success ?
            ( //state.items.customerList.length > 0 &&
            <TimeLine>
              {
                <ListView ref="listView"
                          dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                          renderRow={row}
                          renderBodyComponent={() => <MyBody />}
                          renderHeader={() =>state.items.customerList.length > 0 &&
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
  state: state.customer,
  title:state.crmTitle
});

const mapDispatchToProps = dispatch => ({
  customerAction: bindActionCreators(CustomerAction, dispatch),
  titleAction :bindActionCreators(TitleAction, dispatch)
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerVisit)
