/**
 * @description: 企业客户-过往交易
 * @author: zy
 * @create: 2017/6/7
 */
import React from 'react'
import './trade.less'


export class Trade extends React.Component {

    render() {

        return (
            <div>
                <ListItem/>
                <ListItem/>
                <ListItem/>
            </div>
        );
    }
}

var ListItem=React.createClass({

    render(){
        return(
            <div className="tradeItem">
                <div className="couple">
                    <span className="name">交易类型：</span>
                    <span className="value">分离交易可转换债券</span>
                </div>
                <div className="couple">
                    <span className="name">交易金额：</span>
                    <span className="value">1000w</span>
                </div>
                <div className="couple">
                    <span className="name">负责券商：</span>
                    <span className="value">华泰证券</span>
                </div>
                <div className="couple">
                    <span className="name">项目负责人：</span>
                    <span className="value">张小花</span>
                </div>
            </div>
        )
    },
})




