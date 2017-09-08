/**
 * @description: 时间控件
 * @author: zy
 * @create: 2017/6/7
 */

import React from 'react'
import {Toast,Popup,List,InputItem, Icon} from 'antd-mobile';
const Item = List.Item;
import { bindActionCreators } from 'redux'
import { connect} from 'react-redux'
import * as CustomerNameActions from '../../actions/CustomerNameActioin';

//客户名称弹框
class PopCustomer extends React.Component {
    state = {
        sel: '',
    };
    onSel = (sel) => {
        this.setState({ sel });
        this.props.onClose();
    };
    onClose = (sel) => {

        Popup.hide();
    };

    componentDidUpdate(){
        if(!this.props.customerName.isFetching){
            Toast.hide();
        }
    }

    componentWillReceiveProps(nextProps){

        /*if(!this.props.customerName.isFetching&&nextProps.customerName.isFetching){
            Toast.loading("加载中..",0,false,false)
        }*/

        if(this.props.customerName.isFetching && !nextProps.customerName.isFetching && nextProps.customerName.items.success){
             Toast.hide();

        }else if(this.props.customerName.isFetching && !nextProps.customerName.isFetching && !nextProps.customerName.items.success){
            Toast.hide();
            Toast.fail("加载数据失败",1)
        }
    }

    render() {
        let objs=this.props.customerName.items.nameList;
        let list=[];
        if(objs.length>0){
            for(let i=0;i<objs.length;i++){
                list.push(
                    <Item key={i} onClick={()=>{
                        this.props.custItemClick(objs[i]);
                        Popup.hide();
                    }} >{objs[i].custName}</Item>
                )}
        }
        return (
            <div className="popStyle">
                <List className="popup-list" renderHeader={() => (
                    <div style={{ position: 'relative' }}>
                        <InputItem
                            placeholder="请输入客户名称（单选）"
                            onChange={(e)=>{
                                this.props.CustomerNameActions.onRequestCustomerNameList({"custName":e});}}>
                            {this.props.header}：
                        </InputItem>
                        <span
                            style={{
                                position: 'absolute', right: 20, top:20,
                            }}
                            onClick={() => this.onClose()}
                        >
                            <Icon type="cross" />
                        </span>
                    </div>)}>
                    {list}
                </List>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    customerName:state.customerName,
});

const mapDispatchToProps = dispatch => ({
    CustomerNameActions:bindActionCreators(CustomerNameActions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PopCustomer)