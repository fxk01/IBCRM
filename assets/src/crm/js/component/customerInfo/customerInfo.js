/**
 * @description: 企业客户-基础信息
 * @author: zy
 * @create: 2017/6/7
 */

import React from 'react'
import './customerInfo.less'

import {Checkbox,Icon,Toast,Button} from 'antd-mobile';
import  {default as Refresh} from '../../component/refresh/refresh'

const CheckboxItem = Checkbox.CheckboxItem;

class CustomerInfo extends React.Component {

    static defaultProps = {
        rowData:{
            custName:'',
            custRefname:'',
            custProtrade:'',
            custTrade:'',
            secode:'',
            isComp:'',
            country:'',
            province:'',
            city:'',
            address:'',
            owner:'',
            ownerMobile:'',
            isFormal:"",
            remark:''
        }
    };
    componentWillMount(){
        this.props.tabVisitAction.onRequestTabVisitList({
            visitRecord:{customerId:this.props.custId},
            start:0
        });
    }
    componentDidMount(){

        if(this.props.customerInfo.items.customerInfoList.custId!==this.props.custId){
            this.props.customerInfoAction.onReqCustomerInfo({custId:this.props.custId});
            Toast.hide();
            Toast.loading("加载中...",0,false,false);
        }

        if(this.props.customerInfo.isFetching){
            Toast.hide();
            Toast.loading("加载中...",0,false,false);
        }
    }
    static componentWillUnmount(){
        Toast.hide();
    }

    componentWillReceiveProps(nextProps){

        if(this.props.customerInfo.isFetching && !nextProps.customerInfo.isFetching && nextProps.customerInfo.items.success){
            Toast.hide();
        }else if(this.props.customerInfo.isFetching && !nextProps.customerInfo.isFetching && !nextProps.customerInfo.items.success){
            Toast.hide();
            Toast.fail('加载数据失败',1,false,false);
        }
    }

    onHandleRefresh(){
        this.props.customerInfoAction.onReqCustomerInfo({custId:this.props.custId});
        Toast.loading('加载中...', 0,false,false);

    }

    render() {
        const info=this.props.customerInfo.items.customerInfoList;

        return (
            this.props.customerInfo.items.success?(
                <div className="customerInfo">
                    <div className="block">
                        <div className="cell">
                            <div className="name">客户名称</div>
                            <div className="value">{info.custName}</div>
                        </div>
                        <div className="cell">
                            <div className="name">客户简介</div>
                            <div className="value">{info.custRefname}</div>
                        </div>
                        <div className="cell">
                            <div className="name">行业一级分类</div>
                            <div className="value">{info.custProtrade}</div>
                        </div>
                        <div className="cell">
                            <div className="name">行业二级分类</div>
                            <div className="value">{info.custTrade}</div>
                        </div>
                        <div className="cell">
                            <div className="name">证券代码</div>
                            <div className="value">{info.secode}</div>
                        </div>
                        <div className="cell">
                            <div className="name">是否上市公司</div>
                            <div className="value">{info.isComp==="Y"?"是":"否"}</div>
                        </div>
                    </div>
                    <div className="block">
                        <div className="cell">
                            <div className="name">所在地区</div>
                            <div className="value">{info.country}/{info.province}/{info.city}</div>
                        </div>
                        <div className="cell">
                            <div className="name">详细地址</div>
                            <div className="value">{info.address}</div>
                        </div>
                    </div>
                    <div className="block">
                        <div className="cell">
                            <div className="name">客户负责人</div>
                            <div className="value">{info.ownerInfo?info.ownerInfo[0]["ownerName"]:""}</div>
                        </div>
                        <div className="cell">
                            <div className="name">负责人联系方式</div>
                            <div className="value">{info.ownerMobile}</div>
                        </div>
                        <div className="cell">
                            <div className="name">是否正式客户</div>
                            <div className="value">{info.isFormal==="Y"?"是":"否"}</div>
                        </div>
                    </div>
                    <div className="block">
                        <div className="cell spe-cell">
                            <div className="name">业务描述</div>
                            <div className="value">{info.remark}</div>
                        </div>
                    </div>
                </div>


                ):
                <Refresh refreshClick = {this.onHandleRefresh.bind(this)}/>

        );
    }
}

export default CustomerInfo


