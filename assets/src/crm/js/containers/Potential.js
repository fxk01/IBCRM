/**
 * @description: 潜在业务机会
 * @author: xzqiang
 * @create: 2017/5/18
 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TitleAction from '../actions/TitleAction.js';
import * as BusinessOpportunityActive from '../actions/BusinessOpportunityActive.js';
import { SearchBar ,WhiteSpace,ListView,RefreshControl,Icon,List,Toast} from 'antd-mobile';
import {default as PotentialList} from '../component/potentialList/potentialList'
import  {default as Refresh} from '../component/refresh/refresh'
import CommonSearch from '../component/commonSearch/commonSearch'
import {sendPageMessage} from "../../../../middlewares/com"

class ListViewBody extends  React.Component{
	render(){
		return (
      <div className="am-list-body my-body">
        <span style={{ display: 'none' }}>you can custom body wrap element</span>
				{this.props.children}
      </div>
		)
	}
}

let custName,abnormalConnect=0,isOwn="mine";

class Potential extends React.Component{
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state={
			dataSource: ds,
			data:this.props.businessOppo.items.businessOppoList,
			refreshing: this.props.businessOppo.isFetching,
			isLoading:true,
			hasMore:false
		}
	}
	
	componentWillMount(){
		this.props.titleAction.onTitleChange('潜在业务机会');
	}
	
	componentDidMount(){
		sendPageMessage("企业客户","潜在业务机会");
		if(!this.props.businessOppo.items.businessOppoList.length){
			//this.props.businessOppoAction.onReqBusinessOpportunity({opptyRecord:{custName:""},start:0});
			this.setState({ refreshing: true });
			//Toast.loading('加载中...', 0,false,false);
			abnormalConnect=1;
		}
		if(this.props.businessOppo.items.total && this.props.businessOppo.items.total  >= this.props.businessOppo.items.businessOppoList.length){
			this.setState({
				isLoading:false
			})
		}
	}
	
	componentWillReceiveProps(nextProps){
		if(abnormalConnect === 1 && this.props.businessOppo.isFetching && !nextProps.businessOppo.isFetching && nextProps.businessOppo.items.success){
			Toast.hide();
			//Toast.success('加载数据成功',1,false,false);
			abnormalConnect = 0;
		}else if(abnormalConnect === 1 && this.props.businessOppo.isFetching && !nextProps.businessOppo.isFetching && !nextProps.businessOppo.items.success){
			Toast.hide();
			Toast.fail('加载数据失败',1,false,false);
			abnormalConnect = 0;
		}
		
		const nextList = nextProps.businessOppo.items.businessOppoList;
		const oldList = this.props.businessOppo.items.businessOppoList;
		if (nextProps.businessOppo.items.success && nextList!== oldList ) {
			this.setState({
				hasMore:(nextProps.businessOppo.items.total  - nextList.length )> 0,
				refreshing: nextProps.businessOppo.isFetching,
				isLoading:false,
				data: nextProps.businessOppo.items.businessOppoList,
			});
		}
	}
	
	onHandleValChange(value){
		custName = value;
	}
	
	onRefresh(){
		this.setState({ refreshing: true });
		this.props.businessOppoAction.onReqBusinessOpportunity({opptyRecord:{custName:custName,custType:"corp_cust",ownerScope:isOwn},start:0});
	};
	
	onHandleSubmit (){
		this.refs.listView && this.refs.listView.refs.listview.scrollTo(0, 0);
		this.setState({ refreshing: true });
	}
	
	onEndReached(){
		if (this.state.isLoading || !(this.props.businessOppo.items.total  - this.props.businessOppo.items.businessOppoList.length)) {
			return;
		}
		this.setState({ isLoading: true });
		const listNum = this.props.businessOppo.items.businessOppoList.length;
		this.props.businessOppoAction.onReqBusinessOpportunity({opptyRecord:{custName:custName,custType:"corp_cust",ownerScope:isOwn},start:listNum});
	};
	
	onHandleRefresh(){
		this.props.businessOppoAction.onReqBusinessOpportunity({opptyRecord:{custName:"",custType:"corp_cust",ownerScope:isOwn},start:0});
		Toast.loading('加载中...', 0,false,false);
		abnormalConnect=1;
	}
	
	onOwn(val){
		console.log(val);
		isOwn = val[0]
	}
	
	render(){
		const {businessOppo} = this.props;
		const row = (rowData,selectID,rowID)=>{
			return (
        <PotentialList
          rowData={rowData}
					isOwn={businessOppo.ownerScope==="mine"}
        />
			)
		};
		
		return(
      <div className="potential">
		  <CommonSearch
			  onChange={this.onHandleValChange.bind(this)}
			  onSubmit={this.onHandleSubmit.bind(this)}
			  placeholder="客户名称"
				defaultValue={businessOppo.ownerScope}
				defaultV={businessOppo.searchV}
				showLeftValue={this.onOwn.bind(this)}
			/>
				{
					businessOppo.items.success?
						<ListView className="fortest"
                        ref="listView"
                        renderBodyComponent={() => <ListViewBody/>}
                        dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                        renderFooter={() => (
                          <div style={{ padding: 30, textAlign: 'center' }}>
														{this.state.isLoading ? '加载中...' : '加载完毕'}
                          </div>
												)}
                        renderRow={row}
                        pageSize={6}
                        initialListSize={6}
                        scrollerOptions={{ scrollbars: true }}
                        scrollRenderAheadDistance ={500}
                        scrollEventThrottle={20}
                        onEndReachedThreshold={200}
                        onEndReached={this.onEndReached.bind(this)}
                        refreshControl={<RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this.onRefresh.bind(this)}
                        />}
              />:
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
	businessOppo:state.businessOppo
});

const mapDispatchToProps = dispatch => ({
	titleAction :bindActionCreators(TitleAction, dispatch),
	businessOppoAction:bindActionCreators(BusinessOpportunityActive, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Potential);


