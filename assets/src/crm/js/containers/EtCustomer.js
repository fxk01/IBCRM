/**
 * @description: 企业客户界面
 * @author: xzqiang
 * @create: 2017-05-05 12:41:35
 */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TitleAction from '../actions/TitleAction.js'
import * as BusinessCustomerActions from '../actions/BusinessCustomerActions';
import * as TabNumActions from '../actions/TabNumActions.js'
import {SearchBar,ListView ,RefreshControl,List,Toast} from 'antd-mobile';
import {ShareButton} from  '../component/shareButton/ShareButton'
import {CustomerItem} from '../component/customerItem/customerItem'
import  {default as Refresh} from '../component/refresh/refresh'
import CommonSearch from '../component/commonSearch/commonSearch'
import {sendPageMessage} from "../../../../middlewares/com"

class ListViewBody extends  React.Component{
	render(){
		return (
      <div className="am-list-body my-body">
        <span style={{ display: 'none' }}>you can custom body wrap element</span>
        <List>
					{this.props.children}
        </List>
      </div>
		)
	}
}
let timer,custName,resetList,isOwn="mine";

export class EtCustomer extends React.Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state={
			listChecked:[],
			showCheckBox:this.props.businessCustomer.items.businessCustomerList.length?1:3,
			dataSource: ds,
			data:this.props.businessCustomer.items.businessCustomerList,
			refreshing: this.props.businessCustomer.isFetching,
			isLoading:true,
			hasMore:false
		}
	}
	
	componentWillMount(){
		this.props.titleAction.onTitleChange("企业客户");
		this.props.tabNumAction.onChangeTab(0);
	}
	
	componentDidMount(){
		if(this.props.businessCustomer.items.total && this.props.businessCustomer.items.total  >= this.props.businessCustomer.items.businessCustomerList.length){
			this.setState({
				isLoading:false
			})
		}
		if(!this.props.businessCustomer.items.businessCustomerList.length){
			this.setState({
				refreshing:true
			})
		}
		sendPageMessage("企业客户","企业客户");
	}
	
	componentWillUnmount(){
		clearTimeout(timer);
	}
	
	componentWillReceiveProps(nextProps){
		
		if( this.state.showCheckBox === 3){
			if(nextProps.businessCustomer.isFetching&&!this.props.businessCustomer.items.businessCustomerList.length){
			
			}else{
				Toast.hide();
			}
		}
		
		this.setState({
			isLoading:nextProps.businessCustomer.isFetching
		});
		
		const nextList = nextProps.businessCustomer.items.businessCustomerList;
		const oldList = this.props.businessCustomer.items.businessCustomerList;
		
		if ( nextList!== oldList) {
			this.setState({
				hasMore:(nextProps.businessCustomer.items.total  - nextList.length ) > 0,
				refreshing:nextProps.businessCustomer.isFetching,
				showCheckBox:0,
				isLoading:false,
				data:nextProps.businessCustomer.items.businessCustomerList,
			});
		}
	}
	
	onHandleSearch(){
		resetList = 0;
		this.refs.listView && this.refs.listView.refs.listview.scrollTo(0, 0);
		if(this.props.businessCustomer.items.businessCustomerList && this.props.businessCustomer.items.businessCustomerList.length > 0){
			this.refs.listView && this.refs.listView.refs.listview.scrollTo(0, 0);
			this.setState({ refreshing: true });
		}else{
			resetList = 0;
			this.props.businessCustomerActions.onRequestBusinessCustomer({"enterpriseRecord":{custName,ownerScope:isOwn},start:0});
		}
	}
	
	onRefresh(){
		resetList = 0;
		this.setState({ refreshing: true });
		this.props.businessCustomerActions.onRequestBusinessCustomer({"enterpriseRecord":{custName,ownerScope:isOwn},start:0})
	};

	onEndReached(){
		if (this.state.isLoading || !(this.props.businessCustomer.items.total  - this.props.businessCustomer.items.businessCustomerList.length)) {
			return;
		}
		this.setState({ isLoading: true });
		const listNum = this.props.businessCustomer.items.businessCustomerList.length;
		resetList = listNum;
		this.props.businessCustomerActions.onRequestBusinessCustomer({"enterpriseRecord":{custName,ownerScope:isOwn},start:listNum})
	};
	
	//关闭发送；
	onHandleStart(){
		return false;
		if(this.state.showCheckBox === 2) return ;
		timer = setTimeout(()=>{
			this.setState({
				showCheckBox:2,
			});
		},500);
	};
	
	onHandleEnd (){
		clearTimeout(timer);
	};
	
	onHandleClickList(key_v){
		if(this.state.showCheckBox!==2) return;
		let arr =  this.state.listChecked;
		if(arr.indexOf(key_v) === -1){
			arr.push(key_v);
			this.setState({
				listChecked:arr
			})
		}else{
			const del = arr.indexOf(key_v);
			arr.splice(del,1);
			this.setState({
				listChecked:arr
			})
		}
	}
	
	onHandleOpen(){
		this.setState({
			showCheckBox:2
		})
	}
	
	onHandleClose(){
		this.setState({
			showCheckBox:1
		})
	}
	
	onHandleSend(){
		this.setState({
			showCheckBox:1,
			listChecked:[]
		})
	}
	
	onHandleValChange(value){
		custName = value;
		if(this.state.showCheckBox !== 3){
			this.setState({
				showCheckBox:3
			})
		}
	}
	
	onHandleRefresh(){
		resetList = 0;
		this.setState({
			showCheckBox:3
		});
		Toast.loading('加载中...', 0);
		this.props.businessCustomerActions.onRequestBusinessCustomer({"enterpriseRecord":{custName,ownerScope:isOwn},start:0});
	}
	
	onOwn(val){
		console.log(val);
		isOwn = val[0]
	}
	
	render() {
		const {businessCustomer} = this.props;
		const row = (rowData, sectionID, rowID) => {
			return (
        <CustomerItem
          data={rowData}
          checked={this.state.listChecked.indexOf(parseInt(rowID)+1)!==-1}
          key={parseInt(rowID)}
          key_v={parseInt(rowID)+1}
          touchS={this.onHandleStart.bind(this)}
          touchE={this.onHandleEnd.bind(this)}
          onList = {(key_v)=>{this.onHandleClickList(key_v)}}
					isOwn={businessCustomer.ownerScope==="mine"}
        />
			);
		};
		const listShowClass = ['EtCustomerListView',"EtCustomerListView","EtCustomerListView etCustomerShowCheckBox","EtCustomerListView"];
		return (
      <div className="EtCustomer">
		  <CommonSearch
			  onSubmit={this.onHandleSearch.bind(this)}
			  onChange={this.onHandleValChange.bind(this)}
			  ref = "searchCustomer"
			  placeholder="企业名称"
				defaultValue={businessCustomer.ownerScope}
				defaultV={businessCustomer.searchV}
				showLeftValue={this.onOwn.bind(this)}
			/>
				{
					businessCustomer.items.success?
            <ListView className={listShowClass[this.state.showCheckBox]}
                      ref = "listView"
                      renderBodyComponent={() => <ListViewBody/>}
                      dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                      renderRow={row}
                      renderFooter={() => {
												if( businessCustomer.items.businessCustomerList.length){
													return (
                            <div style={{ padding: 30, textAlign: 'center' }}>
															{this.state.isLoading ? '加载中...' : '加载完毕'}
                            </div>
													)
												}
											}}
                      pageSize={6}
                      initialListSize={6}
                      scrollerOptions={{ scrollbars: true }}
                      scrollRenderAheadDistance={200}
                      scrollEventThrottle={20}
                      onEndReachedThreshold={100}
                      onEndReached={this.onEndReached.bind(this)}
                      refreshControl={<RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                      />}
            /> :
            <Refresh
              refreshClick = {this.onHandleRefresh.bind(this)}
            />
				}
      </div>
		);
	}
}


const mapStateToProps = state => ({
	title:state.crmTitle,
	businessCustomer:state.businessCustomer
});

const mapDispatchToProps = dispatch => ({
	titleAction :bindActionCreators(TitleAction, dispatch),
	businessCustomerActions:bindActionCreators(BusinessCustomerActions, dispatch),
	tabNumAction:bindActionCreators(TabNumActions,dispatch)
});


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EtCustomer)
