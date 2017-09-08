/**
 * @description: 潜在业务机会list
 * @author: xzqiang
 * @create: 2017/5/23
 */
import React from 'react'
import './potentialList.less'
import {List,Icon} from 'antd-mobile';
import {Link} from 'react-router'

const Item = List.Item;
const Brief = Item.Brief;

export default class PotentialList extends React.Component{
  constructor(props){
    super(props);
    this.state= {
			potentialListC:props.hiddenRight||false
    }
  }

  static defaultProps = {
    rowData:{
      visitDate:'',
      custName:'',
      createBy:'',
      opptPtype:'',
      comments:'',
			opptDesc:"",
			createContact:""
    }
  };

  componentDidMount(){
  
  }

  controlShow(){
    this.setState({
      potentialListC:!this.state.potentialListC
    })
  }

  render(){
		const {hiddenRight,rowData} = this.props;
    return (
      <div className="potentialListBox">
        <List className="potentialList-item">
          <div className="header">
            <div className="left">
              <Icon className="icon" type={require('../../../img/svg/ui-qiye.svg')}/>
              <span className="custName">{rowData.custName}</span>
            </div>
						{
							!hiddenRight&&
              <div className="right" onTouchStart={this.controlShow.bind(this)} >
                <Icon className="icon" type={this.state.potentialListC?require('../../../img/svg/ui-shouqi.svg'):require('../../../img/svg/ui-zhankai.svg')} size="xxs" />
              </div>
						}
          </div>
          <div className="description clearfix">
						<span>业务描述</span>
            <span>{this.props.rowData.opptDesc?this.props.rowData.opptDesc:"暂无描述"}</span>
          </div>
          <div className="potentialList-body" ref='potentialListBody'  style={this.state.potentialListC?{maxHeight:'5rem'}:{}}>
            <div className="details-table">
               <div className="tr1">
                 <span>业务机会</span>
                 <span>创建者</span>
                 <span>联系方式</span>
               </div>
              <div className="tr2">
                <span> {rowData.opptPtype}</span>
                <span>{rowData.createBy}</span>
                <span><a style={{color:'#1296db'}} href={`tel:${rowData.createContact}`}>{rowData.createContact}</a></span>
              </div>
            </div>
          </div>
          <div className="footer">
            <Icon className="icon" type={require('../../../img/svg/ui-shijian.svg')}/>
            <span>{rowData.createTs ? "创建时间：":"拜访时间："}</span>
            <span className="time">{rowData.createTs||rowData.visitDate}</span>
          </div>
        </List>
      </div>
    )
  }
}