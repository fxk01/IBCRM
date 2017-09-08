/**
 * Created by admin on 2017/5/9.
 * xzqiang
 */

import React from 'react'
import {Link} from 'react-router'
import './timeLine.less'
import {ListBar , ListBar_item} from  '../listBar/listBar'


export class Line extends React.Component{
	render(){
		return (
      <div className={this.props.type === 'topLine'?'topLine line':'line'}>
      </div>
		)
	}
}

const Circle = ()=>{
	return (
    <div className="circle"></div>
	)
};

//弹出层内容
class Overlay extends  React.Component{
	constructor(){
		super()
	}
	
	onHandleTel(e){
		window.location = `tel:${this.props.phone}`;
		e.preventDefault();
	}
	
	onHandleSms(e){
		window.location = `sms:${this.props.phone}`;
		e.preventDefault();
	}
	
	render(){
		const {phone} = this.props;
		return (
      <ListBar>
				<a onTouchStart={this.onHandleTel.bind(this)}>
					<ListBar_item icon="icon-dianhua" title="电话"/>
				</a>
				<a onTouchStart={this.onHandleSms.bind(this)}>
					<ListBar_item icon="icon-youjian" title="短信"/>
				</a>
        {/*<ListBar_item icon="icon-iconfontshijian" title="预约"/>*/}
        {/*<ListBar_item icon="icon-dingwei" title="GPS"/>*/}
      </ListBar>
		)
	}
}

let timer;

export  class TimeLine_item extends React.Component{
	constructor(){
		super();
		this.state = {
			visible: false
		}
	}
	
	static defaultProps = {
		touchS:()=>{},
		touchE:()=>{},
		popover_visible:0,
		key_v:1,
		visitId:'',
		isOwn:true
	};
	
	render(){
		let offsetX = -10;
		const {phone} = this.props;
		if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
			offsetX = -26;
		}
		return (
      <div className="timeLine_item"
           onClick={this.redirect}
      >
        <div className="popverBox" style={this.props.key_v===this.props.popover_visible?{display:'block'}:{display:"none"}}>
          <Overlay phone={phone}/>
        </div>
        
        <div className="left">
          <Circle/>
          <Line/>
        </div>
        <div className="right">
          <div className="timeLine_item_header">
						{this.props.headerHtml}
          </div>
          <div
            onTouchStart={()=>{this.props.touchS(this.props.key_v)}}
            onTouchEnd={this.props.touchE}
            onTouchMove={this.props.touchE}
            className="timeLine_item_body">
            <div className ='mask' style={this.props.key_v===this.props.popover_visible?{display:'block'}:{display:"none"}}>
            
            </div>
						{
							this.props.isOwn?
								( <Link
									to={{
										pathname:'/roadshow/ibcrm/act/visitedRecord',
										hash: `#${this.props.visitId}`
									}}
								>
									{this.props.bodyHtml}
								</Link>):
								this.props.bodyHtml
						}
          
          </div>
        </div>
      </div>
		
		)
	}
}

export class TimeLine extends React.Component{
	constructor(){
		super();
	}
	
	render(){
		return(
      <div className="timeLine">
        <div className="timeLine_body clearfix">
					{this.props.children}
        </div>
      </div>
		)
	}
}


