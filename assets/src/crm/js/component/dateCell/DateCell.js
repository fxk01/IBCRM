/**
 * @description: 时间控件
 * @author: zy
 * @create: 2017/6/7
 */

import {Icon} from 'antd-mobile';
import React from 'react'
import "./DateCell.less"


/*export class DateCell extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        let extra=this.props.extra;
        let month="";
        let time="";

        if(extra[5]!=='0'){
            month=month+extra[5];
        }
        month=month+extra[6]+"月"+extra[8]+extra[9]+"日";

        let hour=(parseInt(extra[11]+extra[12]));

        if(0<=hour&&hour<6){
            time='凌晨 '+hour;
        }else if(6<=hour&&hour<12){
            time='上午 '+hour;
        }else if(12<=hour&&hour<18){
            time='下午 '+hour;
        }else{
            time='晚上 '+hour;
        }
        time=time+" "+extra[13]+extra[14]+extra[15];
        return(
            <div className="dateCell"
                 onClick={this.props.onClick}
            >
                <div className="main">
                    <span className="name">{this.props.children}</span>
                    <span className="value">
                        <span className="month">{month}</span>
                        <span className="time">{time}</span>
                    </span>
                </div>
                {this.renderIcon()}
            </div>
        )

    }
    renderIcon(){
        if(this.props.hasIcon){
            return(
                <div className="right">
                    <Icon className="icon" type={require('../../../img/svg/date.svg')}/>
                </div>
            )
        }
    }
}*/


export class DateCell extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        let time=this.props.extra;

        return(
            <div className="dateCell"
                 onClick={this.props.onClick}
            >
                <div className="main">
                    <span className="name">{this.props.children}</span>
                    <span className="value">
                        <span style={{fontSize:"0.28rem"}}>{time}</span>
                    </span>
                </div>
                {this.renderIcon()}
            </div>
        )

    }
    renderIcon(){
        if(this.props.hasIcon){
            return(
                <div className="right">
                    <Icon className="icon" type={require('../../../img/svg/ui-riqi.svg')}/>
                </div>
            )
        }
    }
}






export class VisitedCell extends React.Component{
    render(){
        return(
            <div className="dateCell" style={{backgroundColor:"#fff"}}
                 onClick={this.props.onClick}
            >
                <div className="main">
                    <span className="name">{this.props.children}</span>
                    <span className="value">{this.props.extra}</span>
                </div>
                {this.renderIcon()}

            </div>
        )
    }
    renderIcon(){
        if(this.props.hasIcon){
            return(
                <div className="right">
                    <Icon className="icon" style={{color:"#bbb"}} type={require('../../../img/svg/ui-xiangyou.svg')}/>
                </div>
            )
        }
    }
}

