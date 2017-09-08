/**
 * @description: 时间控件
 * @author: zy
 * @create: 2017/6/7
 */

import React from 'react'
import {Toast,Popup,List,InputItem, Icon,Button,TextareaItem} from 'antd-mobile';
const Item = List.Item;
import { bindActionCreators } from 'redux'
import { connect} from 'react-redux'
import * as EmpAction from '../../actions/EmpAction';


function objectToString(object,property){
    let str="";
    for(let i of object){
        str=str+i[property]+",";
    }
    str=str.substring(0,str.length-1);
    return str;
}

//访问对象弹框
class PopEmp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emps:this.props.emps,
            focused:false,
        };
    }
    static defaultProps = {
        emps:new Set()
    };

    componentWillMount(){
        this.setState({
            emps:this.props.emps
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props.emp.isFetching && !nextProps.emp.isFetching && nextProps.emp.items.success){
            Toast.hide();

        }else if(this.props.emp.isFetching && !nextProps.emp.isFetching && !nextProps.emp.items.success){
            Toast.hide();
            Toast.fail("加载数据失败",1)
        }
    }

    onClose = (sel) => {
        if(sel==="sure"){
            this.props.setEmps(this.state.emps);
        }
        Popup.hide();
    };

    //渲染所有被选择的参与人员
    renderEmps(){
        let list=[];
        let index=0;
        for(let i of this.state.emps){
            list.push(
                <span onClick={()=>{
                    this.state.emps.delete(i);
                    this.forceUpdate();
                }} key={index++}>{i["userName"]}&nbsp;&nbsp;</span>
            )
        }
        return list
    }

    render() {
        let objs=this.props.emp.items.empList;
        let list=[];
        for(let i=0;i<objs.length;i++){
            list.push(
                <List.Item key={i} onClick={()=>{
                    let add=true;
                    for(let o of this.state.emps){
                        if(o.userCode===objs[i].userCode){
                            add=false;
                            Toast.fail("已存在",0.5);
                        }
                    }
                    if(add){
                        this.state.emps.add({
                                userName:objs[i].userName,
                                userCode:objs[i].userCode}
                        );
                        this.forceUpdate();
                    }
                }} >{objs[i].userName}<span style={{float:"right"}}>{objs[i].userCode}</span></List.Item>
            )}
        return (
            <div className="popStyle">
                <List renderHeader={() => (
                    <div style={{ position: 'relative' }}>
                        <InputItem
                            placeholder="请输入参与人员或员工号"
                            focused={this.state.focused}
                            onChange={(e)=>{
                                if(e!==""){
                                    let length=e.length;
                                    if(length>2){
                                        let reg=/\d/gi;
                                        if(reg.test(e)){
                                            this.props.EmpAction.onRequestEmpList(
                                                {"iBEmployee":{"userCode":e}});
                                            return;
                                        }
                                    }
                                    this.props.EmpAction.onRequestEmpList(
                                        {"iBEmployee":{"userName":e}});
                                    }
                                }
                            }>
                            参与人员：
                        </InputItem>
                        <span
                            style={{
                                position: 'absolute', right: 20, top:20,
                            }}
                            onClick={() => this.onClose()}
                        >
                            <Icon type="cross" />
                        </span>
                    </div>
                )}
                      className="popup-list"
                >
                    {list}
                </List>
                <div className="bottomView">
                    <div className="select">
                        已选择（点击删除）：{this.renderEmps()}
                    </div>
                    <div className="btns">
                        <Button type="ghost" onClick={()=>{this.state.emps.clear();this.forceUpdate();}}>清空</Button>
                        <Button type="primary" onClick={() => this.onClose('sure')}>确定</Button>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    emp:state.emp,
});

const mapDispatchToProps = dispatch => ({
    EmpAction:bindActionCreators(EmpAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PopEmp)