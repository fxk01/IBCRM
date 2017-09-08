/**
 * Created by K0180001 on 2017/7/15.
 */
import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createForm } from 'rc-form';
import EventEmitter from 'events';
let emitter = new EventEmitter;
import { Icon,List,TextareaItem,InputItem,Picker,Toast} from 'antd-mobile';
import * as TitleAction from '../actions/TitleAction.js'
import * as AddOpportunityAction  from '../actions/AddOpportunityAction.js'

export class AddOppo_Nav extends  React.Component{
	render(){
		return (
				<div onClick={()=>{
					emitter.emit('saveOpportunity');
				}} style={{color:"white"}}>
					保存
				</div>
		)
	}
}

const opportunity_type = [
	{
		children:[
			{
				children:[],
				label:"股权收益权转让和回购",
				value:'transfer'
			},
			{
				children:[],
				label:"信贷资产证券化（CLO）",
				value:'clo'
			},{
				children:[],
				label:"结构化融资",
				value:'struct'
			},{
				children:[],
				label:"资产证券化（ABS）",
				value:'abs'
			},
			{
				children:[],
				label:"优先股",
				value:'pre_stock'
			}
		],
		label:"创新类",
		value:'new'
	},
	{
		children:[
			{
				children:[],
				label:"企业债券",
				value:'ent_bonds'
			},
			{
				children:[],
				label:"中小企业集合债",
				value:'coll_dept'
			},
			{
				children:[],
				label:"金融债",
				value:'fin_bonds'
			},
			{
				children:[],
				label:"私募中票（PPN）",
				value:'ppn'
			},
			{
				children:[],
				label:"次级债务",
				value:'sub_dept'
			},
			{
				children:[],
				label:"次级债",
				value:'sub_bonds'
			},
			{
				children:[],
				label:"可交换债",
				value:'exch_bonds'
			},
			{
				children:[],
				label:"可交换私募债",
				value:'pri_bonds'
			},
			{
				children:[],
				label:"中小企业私募债",
				value:'sma_dept'
			},
			{
				children:[],
				label:"超短融（SCP）",
				value:'scp'
			},
			{
				children:[],
				label:"短期融资券（CP）",
				value:'cp'
			},
			{
				children:[],
				label:"资产支持票据（ABN）",
				value:'abn'
			},
			{
				children:[],
				label:"中期票据（MTN）",
				value:'mtn'
			},
			{
				children:[],
				label:"公司债券",
				value:'corp_bonds'
			},
		],
		label:"债券类",
		value:'bonds'
	},
	{
		children:[
			{
				children:[],
				label:"产业并购",
				value:'indu_merger'
			}
		],
		label:"并购",
		value:'mergers'
	},
	{
		children:[
			{
				children:[],
				label:"非公开发行",
				value:'non_public'
			},
			{
				children:[],
				label:"公开增发",
				value:'public'
			},
			{
				children:[],
				label:"可交换债券",
				value:'ex_bonds'
			},
			{
				children:[],
				label:"可转换债券",
				value:'con_bonds'
			},
			{
				children:[],
				label:"IPO",
				value:'ipo'
			},
			{
				children:[],
				label:"配股",
				value:'rightsissue'
			},
			{
				children:[],
				label:"分离交易可转换债券",
				value:'sep_bonds'
			},
		],
		label:"股权融资",
		value:'financing'
	}
];
let reqInfo = {
	opptPtype:"new",
	oppType:"transfer",
	opptDesc:""
};
class AddOpportunity extends React.Component{
	constructor(props){
		super();
	};
	
	
	componentDidMount(){
		reqInfo = {
			opptPtype:"new",
			oppType:"transfer",
			opptDesc:""
		};
		emitter.removeAllListeners("saveOpportunity");
		emitter.on("saveOpportunity",this.onHandleSaveOpportunity);
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.addOpportunity.items.success){
			Toast.success("保存成功",1.5);
			this.props.addOpportunityAction.onResetState();
			
		}
	}
	
	onHandleSaveOpportunity=()=>{
		if(!reqInfo.oppType){
			Toast.info("请选则潜在业务类型",1.5);
			return;
		}else if(!reqInfo.opptDesc){
			Toast.info("请填写描述",1.5);
			return;
		}
		
		this.props.addOpportunityAction.onRequestAddOpportunity(
			{
					opptyRecord:{
						createContact:reqInfo.createContact,
						oppType:reqInfo.oppType,
						opptDesc:reqInfo.opptDesc,
						opptPtype:reqInfo.opptPtype,
						visitId:location.hash.split("#")[1]
				}
			});
	};
	
	onHandleOk(value){
		reqInfo.opptPtype = value[0];
		reqInfo.oppType = value[1];
	}
	
	onHandleC(v){
		reqInfo.createContact = v;
	}
	
	onHandleD(v){
		reqInfo.opptDesc = v;
	}
	
		render(){
			const { getFieldProps } = this.props.form;
			const {addOpportunity} =  this.props;
			return (
				<div className="addOpportunity">
					<List className="message">
						<Picker extra="潜在业务机会类别"
										data={opportunity_type}
										title="选择地区"
										cols={2}
										format={(values) => { return values.join('/'); }}
										{...getFieldProps('opportunity_type', {
											initialValue: ['new',"transfer"],
										})}
										onOk={this.onHandleOk}
										onDismiss={e => console.log('dismiss', e)}
						>
							<List.Item arrow="horizontal">潜在业务机会类别</List.Item>
						</Picker>
						<div className="cell">
							<div className="main">
								<div className="text">
									<div className="name">业务机会描述</div>
									<div className="value">
										<TextareaItem onChange={this.onHandleD}
											rows="3"
										/>
									</div>
								</div>
							</div>
						</div>
					</List>
				</div>
			)
		}
}

let AddOppo = createForm()(AddOpportunity);

const mapStateToProps = state => (
	{
		title:state.crmTitle,
		addOpportunity:state.addOpportunity
	}
);

const mapDispatchToProps = dispatch => ({
	titleAction :bindActionCreators(TitleAction, dispatch),
	addOpportunityAction:bindActionCreators(AddOpportunityAction,dispatch)
});


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddOppo)

