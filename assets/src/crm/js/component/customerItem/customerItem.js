/**
 * Created by admin on 2017/5/10.
 * xzqiang
 */
import React from 'react'
import {Link} from 'react-router'
import './customerItem.less'
import {Checkbox} from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
import {Icon} from 'antd-mobile';

// 每一行元素
export class CustomerItem extends React.Component{
    constructor(props) {
        super(props);
    }

    static defaultProps = {
      key_v:0,
      checked:false,
      custId:'',
			isOwn:true,
      data:{
        city:'',
        custName:'',
        custProtrade:'',
        custTrade:'',
        owner:'',
        province:'',
        type:''
      },
      onList:()=>{}
    };

    render(){
      if(this.props.isOwn){
        return (
          <Link to={{
						pathname: '/roadshow/ibcrm/act/infoTab',
						hash:`#${this.props.data.custId}`,
						query: { custName: `${this.props.data.custName}`, custType: `${this.props.data.custType}` }
					}}>
            <div className="customerItemView">
              <div className="header">
                <Icon className="icon" type={require('../../../img/svg/ui-qiye.svg')}/>
                <span className="custName">{this.props.data.custName}</span>
                <label className="owner">{this.props.data.owner}</label>
              </div>
              <div className="body">
                <div className="row">
                  <label className="name">一级分类</label>
                  <label className="value">{this.props.data.custProtrade}</label>
                </div>
                <div className="row">
                  <label className="name">二级分类</label>
                  <label className="value">{this.props.data.custTrade}</label>
                </div>
              </div>
            </div>
          </Link>
        )
      }else{
         return (
           <div className="customerItemView">
             <div className="header">
               <Icon className="icon" type={require('../../../img/svg/ui-qiye.svg')}/>
               <span className="custName">{this.props.data.custName}</span>
               <label className="owner">{this.props.data.owner}</label>
             </div>
             <div className="body">
               <div className="row">
                 <label className="name">一级分类</label>
                 <label className="value">{this.props.data.custProtrade}</label>
               </div>
               <div className="row">
                 <label className="name">二级分类</label>
                 <label className="value">{this.props.data.custTrade}</label>
               </div>
             </div>
           </div>
         )
      }
    }
}
