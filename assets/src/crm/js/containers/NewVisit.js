/**
 * @zy enterprise customer
 * @@ 2017-5-18 establish
 */
import React from 'react'
import {Toast, WhiteSpace,List,InputItem,TextareaItem,DatePicker,NavBar, Icon,Picker,Switch,Popup} from 'antd-mobile';
const Item = List.Item;
import moment from 'moment';
import 'moment/locale/zh-cn';
import { bindActionCreators } from 'redux'
import { connect,Provider } from 'react-redux'
import * as TitleAction from '../actions/TitleAction.js'
import * as VisitObjectActions from '../actions/VisitObjectAction';
import * as NewVisitAction from '../actions/NewVisitAction';
import {DateCell,VisitedCell} from '../component/dateCell/DateCell'
import PopCustomer from '../component/popCustomer/popCustomer'
import PopVisitObject from '../component/popVisitObject/popVisitObject'
import PopEmp from '../component/popEmp/popEmp'
import * as tabVisitAction from '../actions/TabVisitAction.js';
import * as CustomerAction from '../actions/CustomerActioin.js'
import EventEmitter from 'events';
let emitter = new EventEmitter;
import {store} from '../store/configureStore'
import {userInfo} from '../userInfo'

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

// 导航
export class NewVisitNav extends React.Component{
    render(){
        return(
            <div onClick={()=>{
                emitter.emit('saveClick');
            }}
                 style={{color:"white"}}>
                保存
            </div>
        )
    }
}

const zhNow = moment().locale('zh-cn').utcOffset(8);

class NewVisit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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

            date: zhNow,
            customer:{custId:"",custType:"",custName:""},//客户（包含客户id、客户类型、客户名称）
            visitObjects:new Set(),//访问对象
            emps:new Set(),//参与人员
            address:"",//地址
           /* visitTypeValue:'',//拜访类型*/
          /*  isVisited:false,//是否完成拜访
            isWarm:false,//预约提醒*/


            sensitive:false,//是否敏感信息
            interviewSummary:"",//访谈纪要
            caseAnalyse:'',//客户重大情况

            hasCust:false,
        };
    }

    componentWillMount(){
        this.props.titleAction.onTitleChange("新建拜访");

        let params=parseURL(location).params;

        if(params.custName!==undefined){
            this.setState({
                customer:{custId:params.custId,custType:params.custType,custName:decodeURI(params.custName)},
                hasCust:true,
            });
            this.props.VisitObjectActions.onRequestVisitObjectList({"custId":params.custId});
        }
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

        this.props.NewVisitAction.onRequestNewVisit(
            {"visitRecord":
                {"visitDate":this.state.date.year()+"-"+month+"-"+date,
                    "customerName":this.state.customer["custName"],
                    "customerId":this.state.customer["custId"],
                    "participants":objectToString(this.state.emps,"userName"),
                    "readOnlyflag":"",
                    "participantsId":objectToString(this.state.emps,"userCode"),
                    "visitObject":objectToString(this.state.visitObjects,"contactName"),
                    "sensitive":this.state.sensitive?"Y":"N",
                    "startDate":"",
                    "endDate":"",
                    "positionName":"",
                    "interviewSummary":this.state.interviewSummary,
                    "caseAnalyse":this.state.caseAnalyse,
                    "customerType":this.state.customer["custType"],
                    "busChance":"",
                    "createBy":userInfo.userCode,
                    "contactId":objectToString(this.state.visitObjects,"contactId"),
                    "projectId":"",
                    "projectName":"",
                    // "visitType":this.state.visitTypeValue[0],
                    "visitType":"nor_visit",
                    "visitId":"",
                    "cust_category":""},
                "loginCode":userInfo.userCode}
        );
    };

    componentDidMount(){
        emitter.on('saveClick',this.saveBtn);
    }

    componentWillUnmount(){
        emitter.removeListener('saveClick',this.saveBtn);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.newVisit.isFetching && !nextProps.newVisit.isFetching && nextProps.newVisit.items.success){

            let params=parseURL(location).params;

            if(params.custName!==undefined){
                this.props.tabVisitAction.onRequestTabVisitList({
                    visitRecord:{customerId:parseURL(location).params.custId},
                    start:0
                });
            }else{
                this.props.customerAction.onRequestCustomerList({visitRecord:{customerName:''},start:0});
            }
            Toast.success("保存成功",1,()=>{history.go(-1);},false);
        }else if(this.props.newVisit.isFetching && !nextProps.newVisit.isFetching && !nextProps.newVisit.items.success){
            Toast.fail(nextProps.newVisit.items.visitInfo.message,1);
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
        if(!this.state.hasCust){
            Popup.show(
                <Provider store={store}>
                    <PopCustomer
                        header="客户名称"
                        custItemClick={(obj)=>{this.custItemClick(obj)}}
                        className="Popup" onClose={() => Popup.hide()} />
                </Provider>,
                {  animationType: 'slide-down', maskProps, maskClosable: false  });
        }
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



    render() {
        return (
            <div className="newVisit">
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
                        {!this.state.hasCust?(
                            <div className="right">
                                <Icon className="icon" style={{color:"#bbb"}} type={require('../../img/svg/ui-xiangyou.svg')}/>
                            </div>
                        ):(null)}
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

                   {/* <div className="cell">
                        <Picker
                            data={this.state.visitType}
                            title="拜访类型"
                            cascade={false}
                            extra="请选择(可选)"
                            value={this.state.visitTypeValue}
                            onChange={(value) => {this.setState({visitTypeValue: value});}}
                        >
                            <VisitedCell hasIcon={true}>拜访类型</VisitedCell>
                        </Picker>
                    </div>*/}

                    {/*<div className="cell">
                        <div className="main">
                            <InputItem
                                       placeholder="请输入拜访地址"
                                       onChange={(e)=>{this.setState({address:e});}}
                            >预约地址：</InputItem>
                        </div>
                        <div className="right">
                            <span className="icon-dingwei icon iconfont"/>
                        </div>
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
                            <div className="text">
                                <div className="name">访谈纪要</div>
                                <div className="value">
                                    <TextareaItem
                                        autoHeight={true}
                                        rows={3}
                                        value={this.state.interviewSummary}
                                        onChange={(e)=>{
                                            this.setState({
                                                interviewSummary:e
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="cell">
                        <div className="main">
                            <div className="text">
                                <div className="nameLong">客户重大情况分析</div>
                                <div className="value">
                                    <TextareaItem
                                        autoHeight={true}
                                        value={this.state.caseAnalyse}
                                        rows={3}
                                        onChange={(e)=>{
                                            this.setState({
                                                caseAnalyse:e
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </List>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    title:state.crmTitle,
    newVisit:state.newVisit
});

const mapDispatchToProps = dispatch => ({
    titleAction :bindActionCreators(TitleAction, dispatch),
    VisitObjectActions:bindActionCreators(VisitObjectActions, dispatch),
    NewVisitAction:bindActionCreators(NewVisitAction, dispatch),
    tabVisitAction:bindActionCreators(tabVisitAction, dispatch),
    customerAction: bindActionCreators(CustomerAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewVisit)