/**
 * @zy enterprise customer
 * @@ 2017-5-18 establish
 */
import React from 'react'
import {Link} from 'react-router'
import {Toast,Popup,ListView, WhiteSpace,List,InputItem,TextareaItem,DatePicker,Picker,Icon ,Switch} from 'antd-mobile';
const Item = List.Item;
import moment from 'moment';
import 'moment/locale/zh-cn';
import { bindActionCreators } from 'redux'
import { connect,Provider } from 'react-redux'
import * as TitleAction from '../actions/TitleAction.js'
import * as VisitRecordInfoAction from '../actions/VisitRecordInfoAction'
import * as CustomerNameActions from '../actions/CustomerNameActioin';
import * as VisitObjectActions from '../actions/VisitObjectAction';
import * as NewVisitAction from '../actions/NewVisitAction';
import * as OpportunityByVisitAction from '../actions/OpportunityByVisitAction';
import {DateCell,VisitedCell} from '../component/dateCell/DateCell'
import EventEmitter from 'events';
let emitter = new EventEmitter;
import {store} from '../store/configureStore'
const zhNow = moment().locale('zh-cn').utcOffset(8);
import PopCustomer from '../component/popCustomer/popCustomer'
import PopVisitObject from '../component/popVisitObject/popVisitObject'
import PopEmp from '../component/popEmp/popEmp'
import {userInfo} from '../userInfo'
import  {default as Refresh} from '../component/refresh/refresh'
import {default as PotentialList} from '../component/potentialList/potentialList'

function objectToString(object,property){
	let str="";
	for(let i of object){
		str=str+i[property]+",";
	}
	str=str.substring(0,str.length-1);
	return str;
};

//弹框设置
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let maskProps;
if (isIPhone) {
	// Note: the popup content will not scroll.
	maskProps = {
		onTouchStart: e => e.preventDefault(),
	};
}

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

export class VisitedRecordNav extends React.Component{
	render(){
		return(
			<div onClick={()=>{
				emitter.emit('saveClick');
			}} style={{color:"white"}}>
				保存
			</div>
		)
	}
}


class VisitedRecord extends React.Component {
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds,
			data:this.props.oppoByVisit.items.OppoListByVisit,//潜在业务机会数据
			visitType:[
				[
					{
						label: '日常拜访',
						value: 'nor_visit',
					},
					{
						label: '项目拜访',
						value: 'pro_visit',
					},
				]
			],
			createdContact:"",//创建者联系方式
			custType:"",
			date: zhNow,
			address:'',//地址
			importantUpdate:'',
			customer:{custId:"",custType:"",custName:""},//客户（包含客户id、客户类型、客户名称）
			visitObjects:new Set(),//访问对象
			emps:new Set(),//参与人员
			sensitive:false,//是否敏感信息
			interviewSummary:'',//访谈纪要
			caseAnalyse:'',//客户重大情况
			openOpportunity:false,
			contact:"",

			openInterviewSummary:false,
            openCaseAnalyse:false,
            showDetailButton1:false,
            showDetailButton2:false,
		};
	}
	saveBtn=()=>{
		if(this.state.customer["custName"]===""){
			Toast.fail("客户名称不能为空",1);
			return;
		}
		if(this.state.visitObjects.size===0){
			Toast.fail("访问对象不能为空",1);
			return;
		}
		if(this.state.emps.size===0){
			Toast.fail("参与人员不能为空",1);
			return;
		}
		/* if(this.state.visitTypeValue===""){
		 Toast.fail("拜访类型不能为空",1);
		 return;
		 }*/
		if(this.state.interviewSummary===""){
			Toast.fail("访谈纪要不能为空",1);
			return;
		}
		let month=this.state.date.month()+1;
		if(month<10){
			month="0"+month;
		}
		let date=this.state.date.date();
		if(date<10){
			date="0"+date;
		}
		
		let info=this.props.visitRecordInfo.items.info;
		let data={"visitRecord":
			{"visitDate":this.state.date.year()+"-"+month+"-"+date,
				"customerName":this.state.customer["custName"],
				"customerId":this.state.customer["custId"],
				"participants":objectToString(this.state.emps,"userName"),
				"readOnlyflag":info.readOnlyflag,
				"participantsId":objectToString(this.state.emps,"userCode"),
				"visitObject":objectToString(this.state.visitObjects,"contactName"),
				"sensitive":this.state.sensitive?"Y":"N",
				"startDate":info.startDate,
				"endDate":info.endDate,
				"positionName":info.positionName,
				"interviewSummary":this.state.interviewSummary,
				"caseAnalyse":this.state.caseAnalyse,
				"customerType":this.state.customer["custType"],
				"busChance":info.busChance,
				"createBy":info.createBy,
				"contactId":objectToString(this.state.visitObjects,"contactId"),
				"projectId":info.projectId,
				"projectName":info.projectName,
				// "visitType":this.state.visitTypeValue[0],
				// "visitType":info.visitType,
				"visitType":"nor_visit",
				"visitId":info.visitId,
				"cust_category":info.cust_category},
			"loginCode":userInfo.userCode};
		this.props.NewVisitAction.onRequestNewVisit(
			data
		);
	};
	
	componentWillMount(){
		this.props.titleAction.onTitleChange("拜访记录");
	}
	
	componentWillReceiveProps(nextProps){
		//创建者联系方式
		if(nextProps.visitRecordInfo.record){
			this.setState({
				createdContact:nextProps.visitRecordInfo.record.createdContact
			})
		}
		
		const {oppoByVisit} = nextProps;
		
		if(this.props.visitRecordInfo.isFetching
			&& !nextProps.visitRecordInfo.isFetching
			&& nextProps.visitRecordInfo.items.success){
			Toast.hide();
		}else if(
			this.props.visitRecordInfo.isFetching &&
			!nextProps.visitRecordInfo.isFetching &&
			!nextProps.visitRecordInfo.items.success)
		{
			Toast.hide();
			Toast.fail('加载数据失败',1,false,false);
		}
		const nextList = nextProps.visitRecordInfo.items.info;
		const oldList = this.props.visitRecordInfo.items.info;
		if (nextProps.visitRecordInfo.items.success
			&& nextList!== oldList ) {
			const info=nextProps.visitRecordInfo.items.info;
			//处理时间
			let newDate=info.visitDate.split('-');
			zhNow.year(newDate[0]).month(newDate[1]-1).date(newDate[2]);
			
			//处理参与人员
			let emps=info.participants.split(',');
			let empIds=info.participantsId.split(',');
			
			for(let i=0;i<emps.length;i++){
				this.state.emps.add({userName:emps[i],userCode:empIds[i]});
			}
			
			//处理访问对象
			let visitObject,visitObjectId;
			if(info.visitObject!==null){
				visitObject=info.visitObject.split(',');
				visitObjectId=info.contactId.split(',');
				
				for(let i=0;i<visitObject.length;i++){
					this.state.visitObjects.add({contactName:visitObject[i],contactId:visitObjectId[i]});
				}
			}
			
			//获取访问对象
			this.props.VisitObjectActions.onRequestVisitObjectList({"custId":info.customerId});
			
			this.setState({
				date:zhNow,
				customer:{custId:info.customerId,custType:"",custName:info.customerName},
				sensitive:info.sensitive!=="N",//是否敏感信息
				interviewSummary:info.interviewSummary===null?"":info.interviewSummary,//访谈纪要
				caseAnalyse:info.caseAnalyse===null?"":info.caseAnalyse,//客户重大情况
				// visitTypeValue:info.visitType
			});

		}
		if(this.props.newVisit.isFetching && !nextProps.newVisit.isFetching && nextProps.newVisit.items.success){
			Toast.success("保存成功",1,()=>{history.go(-1);},false);
		}else if(this.props.newVisit.isFetching && !nextProps.newVisit.isFetching && !nextProps.newVisit.items.success){
			Toast.fail(nextProps.newVisit.items.visitInfo.message,1);
		}
		
		
	//	潜在业务机会
		if(oppoByVisit.items.success && oppoByVisit.items.OppoListByVisit.length ){
			this.setState({
				data:oppoByVisit.items.OppoListByVisit,
				isFetching:oppoByVisit.isFetching
			})
		}
	}
	
	componentDidMount(){
		 this.props.VisitRecordInfoAction.onReqVisitRecordInfo({"visitId":location.hash.substr(1)});
		 this.props.OpportunityByVisitAction.onReqOpportunityByVisit(
		 {"visitId":location.hash.substr(1),
		"custType":"corp_cust",
		 "userInfo":
		 {"deptName":"",
		 "userCode":userInfo.userCode,
		 "roleList":[""]}
		 });
		emitter.on('saveClick',this.saveBtn);
	}
	
	
	componentWillUnmount(){
		emitter.removeListener('saveClick',this.saveBtn);
	}

	componentDidUpdate(){
		let height=117;

        if(this.refs.area1.getBoundingClientRect().height>height&&!this.state.showDetailButton1){
            this.setState({
                showDetailButton1:true
            })
        }else if(this.refs.area1.getBoundingClientRect().height<=height&&this.state.showDetailButton1){
            this.setState({
                showDetailButton1:false
            })
		}
        if(this.refs.area2.getBoundingClientRect().height>height&&!this.state.showDetailButton2){
            this.setState({
                showDetailButton2:true
            })
        }else if(this.refs.area2.getBoundingClientRect().height<=height&&this.state.showDetailButton2){
            this.setState({
                showDetailButton2:false
            })
        }
	}

	//设置客户对象id
	custItemClick(obj){
		if(obj.custId!==this.state.customer["custId"]){
			this.state.visitObjects.clear();
			this.setState({
				customer:obj
			});
			this.props.VisitObjectActions.onRequestVisitObjectList({"custId":obj.custId});
		}
	}
	
	//点击客户名称选择
	custNameClick = () => {
		Popup.show(
			<Provider store={store}>
				<PopCustomer
					header="客户名称"
					custItemClick={(obj)=>{this.custItemClick(obj)}}
					className="Popup" onClose={() => Popup.hide()} />
			</Provider>,
			{  animationType: 'slide-down', maskProps, maskClosable: false  });
	};
	
	//点击访问对象选择
	visitObjectClick = () => {
		if(this.state.customer["custId"]!==""){
			Popup.show(
				<Provider store={store}>
					<PopVisitObject
						header="访问对象"
						setVisitObject={(visitObjects)=>{this.setState({visitObjects:visitObjects})}}
						className="Popup" onClose={() => Popup.hide()}
						custId={this.state.customer["custId"]}
						visitObjects={this.state.visitObjects}
					/>
				</Provider>,
				{  animationType: 'slide-down', maskProps, maskClosable: false  });
		}else{
			Toast.fail('请输入客户名称 !', 1);
		}
	};
	
	//点击访问对象选择
	empClick = () => {
		Popup.show(
			<Provider store={store}>
				<PopEmp
					header="参与人员"
					setEmps={(emps)=>{this.setState({emps:emps})}}
					className="Popup"
					emps={this.state.emps}
				/>
			</Provider>,
			{  animationType: 'slide-down', maskProps, maskClosable: false  });
	};
	
	
	onHandleRefresh(){
		Toast.loading('加载中...', 0);
		this.props.VisitRecordInfoAction.onReqVisitRecordInfo({"visitId":location.hash.substr(1)});
	}
	
	onHandleOpen(){
		this.setState((nextState)=>{
		if(!this.state.openOpportunity){
			let basic = parseInt(document.querySelector("html").style.fontSize);
			this.refs.visitedRecord_box.style.top = -(this. refs.visitedRecord_box.offsetHeight - basic)/basic + "rem";
		}else{
			this.refs.visitedRecord_box.style.top = "0"
		}
			return {openOpportunity:!nextState.openOpportunity}
		});
	}
	render() {
		const {openOpportunity} = this.state;
		const {oppoByVisit} = this.props;
		const row = (rowData,selectID,rowID)=>{
			return (
				<PotentialList
					rowData={Object.assign(rowData,{custName:this.state.customer["custName"]})}
					hiddenRight={true}
				/>
			)
		};
		return(
			this.props.visitRecordInfo.items.success?
				(
					<div className="visitedRecord">
						<div ref="visitedRecord_box" className="visitedRecord_box">
							<List className="message">
								<div className="cell">
									<DatePicker className="forss"
															mode="date"
															onChange={(date)=>{this.setState({date:date})}}
															value={this.state.date}
									>
										<DateCell hasIcon={true}>拜访日期</DateCell>
									</DatePicker>
								</div>
								<div className="cell" onClick={this.custNameClick}>
									<div className="main">
										<div className="text">
											<div className="name">客户名称</div>
											<div className="value">{this.state.customer["custName"]===""?"请输入客户名称":this.state.customer["custName"]}</div>
										</div>
									</div>
									<div className="right">
										<Icon className="icon" style={{color:"#bbb"}} type={require('../../img/svg/ui-xiangyou.svg')}/>
									</div>
								</div>
								<div className="cell" onClick={this.visitObjectClick}>
									<div className="main">
										<div className="text">
											<div className="name">访问对象</div>
											<div className="value">{this.state.visitObjects.size===0?"添加访问对象":objectToString(this.state.visitObjects,"contactName")}</div>
										</div>
									</div>
									<div className="right">
										<Icon className="icon" type={require('../../img/svg/ui-xinzeng.svg')}/>
									</div>
								</div>
								<div className="cell" onClick={this.empClick}>
									<div className="main">
										<div className="text">
											<div className="name">参与人员</div>
											<div className="value">{this.state.emps.size===0?"添加参与人员":objectToString(this.state.emps,"userName")}</div>
										</div>
									</div>
									<div className="right">
										<Icon className="icon" type={require('../../img/svg/ui-xinzeng.svg')}/>
									</div>
								</div>
								{/*<div className="cell">
								 <Picker
								 data={this.state.visitType}
								 title="拜访类型"
								 cascade={false}
								 extra="请选择(可选)"
								 value={this.state.visitTypeValue}
								 onChange={(value) => {this.setState({visitTypeValue: value});}}
								 >
								 <VisitedCell>拜访类型</VisitedCell>
								 </Picker>
								 </div>*/}
								<div className="cell spe-cell">
									<div className="main">
										是否敏感信息
									</div>
									<div className="right">
										<Switch className="switchStyle"
														checked={this.state.sensitive}
														onChange={()=>{this.setState({sensitive:!this.state.sensitive})}}
										/>
									</div>
								</div>
								<div className="cell">
									<div className="main">
										<div className="text text2">
											<div className="name">访谈纪要</div>
											<div  className={this.state.openInterviewSummary?"value":"value areaMin"}>
												<div ref="area1">
													<TextareaItem
																  autoHeight={true}
																  value={this.state.interviewSummary}
																  onChange={(e)=>{
                                                                      this.setState({
                                                                          interviewSummary:e
                                                                      })
                                                                  }}
													/>
												</div>
											</div>
											<div style={{display:this.state.showDetailButton1?"block":"none"}} onClick={()=>this.setState({
                                                openInterviewSummary:!this.state.openInterviewSummary,
                                            })} className="ts">
                                                {this.state.openInterviewSummary?"收起详情":"展开详情"}
											</div>
										</div>
									</div>
								</div>
								<div className="cell">
									<div className="main">
										<div className="text text2">
											<div className="name">客户重大情况分析</div>
											<div  className={this.state.openCaseAnalyse?"value":"value areaMin"}>
												<div ref="area2">
													<TextareaItem
																  autoHeight={true}
																  value={this.state.caseAnalyse}
																  onChange={(e)=>{this.setState({
																			caseAnalyse:e
																		})
																	}}
													/>
												</div>
											</div>
											<div style={{display:this.state.showDetailButton2?"block":"none"}} onClick={()=>this.setState({
                                                openCaseAnalyse:!this.state.openCaseAnalyse,
                                            })} className="ts">
                                                {this.state.openCaseAnalyse?"收起详情":"展开详情"}
											</div>
										</div>
									</div>
								</div>
								<div onClick={this.onHandleOpen.bind(this)} className="cell spe-cell">
									<div className="main">
										<Icon type={require('../../img/svg/ui-yewu.svg')}/>
										潜在业务机会
									</div>
									<div className="right">
										<Icon type={openOpportunity?require('../../img/svg/ui-shouqi.svg'):require('../../img/svg/ui-zhankai.svg')}/>
									</div>
								</div>
								<div className={`opportunityBox${openOpportunity?" open":''}`}>
									{
										<ListView className="fortest"
															ref="listView"
															renderBodyComponent={() => <ListViewBody/>}
															renderFooter={() => (
																<div>
																	<Link to={{
																		pathname:'/roadshow/ibcrm/act/addOppo',
																		hash: `#${location.hash.substr(1)}#${this.state.createdContact}`
																	}}
																	>
																		<div className="addBtn">
																			<Icon type={require('../../img/svg/add2.svg')}/>
																			新增潜在业务机会
																		</div>
																	</Link>
																</div>
															)}
															dataSource={this.state.dataSource.cloneWithRows(oppoByVisit.opptTypeId===location.hash.substr(1)?this.state.data:[])}
															renderRow={row}
															pageSize={6}
															initialListSize={6}
															scrollerOptions={{ scrollbars: true }}
															scrollRenderAheadDistance ={500}
															scrollEventThrottle={20}
															onEndReachedThreshold={200}
										/>
									}
								</div>
							</List>
						</div>
						{/* <PotentialList/>*/}
					</div>
				):
				<Refresh
					refreshClick = {this.onHandleRefresh.bind(this)}
				/>
		)
	}
}

const mapStateToProps = state => (
	{
		title:state.crmTitle,
		newVisit:state.newVisit,
		visitRecordInfo:state.visitRecordInfo,
		oppoByVisit:state.oppoByVisit
	}
);

const mapDispatchToProps = dispatch => ({
	titleAction :bindActionCreators(TitleAction, dispatch),
	VisitObjectActions:bindActionCreators(VisitObjectActions, dispatch),
	NewVisitAction:bindActionCreators(NewVisitAction, dispatch),
	VisitRecordInfoAction :bindActionCreators(VisitRecordInfoAction, dispatch),
	OpportunityByVisitAction:bindActionCreators(OpportunityByVisitAction, dispatch)
});


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VisitedRecord)