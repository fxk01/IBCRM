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
import * as VisitObjectActions from '../../actions/VisitObjectAction';


function objectToString(object,property){
    let str="";
    for(let i of object){
        str=str+i[property]+",";
    }
    str=str.substring(0,str.length-1);
    return str;
}

//访问对象弹框
class PopVisitObject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            objs:this.props.objs
        };
    }
    static defaultProps = {
        objs:new Set()
    };

    componentWillMount(){
        this.setState({
            objs:this.props.objs
        })
        if(this.props.visitObject.isFetching){
            Toast.loading("加载中..",0)
        }
    }

    componentWillReceiveProps(nextProps){

        if(this.props.visitObject.isFetching && !nextProps.visitObject.isFetching && nextProps.visitObject.items.success){

            Toast.hide();

        }else if(this.props.visitObject.isFetching && !nextProps.visitObject.isFetching && !nextProps.visitObject.items.success){
            Toast.hide();
            Toast.fail("加载数据失败",1)
        }
    }

    onClose = (sel) => {
        if(sel==="sure"){
            this.props.setVisitObject(this.state.objs);
        }
        Popup.hide();
    };


    renderObjs(){
        let list=[];
        let index=0;
        for(let i of this.state.objs){
            list.push(
                <span onClick={()=>{
                    this.state.objs.delete(i);
                    this.forceUpdate();
                }} key={index++}>{i["contactName"]}&nbsp;&nbsp;</span>
            )
        }
        return list
    }

    render() {
        let objs=this.props.visitObject.items.nameList;
        // console.log(objs)
        let list=[];
        for(let i=0;i<objs.length;i++){
            list.push(
                <List.Item key={i} onClick={()=>{
                    if(this.state.objs.size===objs.length){
                        this.onClose('sure');
                        return;
                    }
                    let add=true;
                    for(let o of this.state.objs){
                        if(o.contactId===objs[i].contactId){
                            add=false;
                            Toast.fail("已存在",0.5);
                        }
                    }
                    if(add){
                        this.state.objs.add({
                            contactName:objs[i].contactName,
                            contactId:objs[i].contactId}
                        );
                        this.forceUpdate();
                        if(this.state.objs.size===objs.length){
                            this.onClose('sure');
                        }
                    }
                }} >{objs[i].contactName}</List.Item>
            )}
        return (
            <div className="popStyle">
                <List renderHeader={() => (
                    <div style={{ position: 'relative' }}>
                       {/* <InputItem
                            placeholder="请输入参与人员名称（可多选）"
                            focused={true}
                            onChange={(e)=>{this.props.VisitObjectActions.onRequestVisitObjectList({"custId":this.props.custId,"custName":e});}}>
                            {this.props.header}：
                        </InputItem>*/}
                        <InputItem editable={false}>
                            请选择：
                        </InputItem>
                        <span
                            style={{
                                position: 'absolute', right: 20, top:20,
                            }}
                            onClick={() =>{
                                if(this.props.visitObjects.size===0){
                                    this.state.objs.clear();
                                }
                                this.onClose();
                            }}
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
                        已选择（点击删除）：{this.renderObjs()}
                    </div>
                    <div className="btns">
                        <Button type="ghost" onClick={()=>{this.state.objs.clear();this.forceUpdate();}}>清空</Button>
                        <Button type="primary" onClick={() => this.onClose('sure')}>确定</Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    visitObject:state.visitObject,
});

const mapDispatchToProps = dispatch => ({
    VisitObjectActions:bindActionCreators(VisitObjectActions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PopVisitObject)