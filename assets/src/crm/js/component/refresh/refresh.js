/**
 * @description: 重新刷新
 * @author: zy
 * @create: 2017/6/6
 */
import React from 'react'
import {Icon,Button} from 'antd-mobile';
import './refresh.less'

export default class Refresh extends React.Component {

    static defaultProps={
        refreshClick:()=>{}
    };

    render(){
        return(
            <div className="refreshView">
                <img src={require('../../../img/ui/img_error_a.png')}/>
                <p className="label1">网络出错了！</p>
                <p className="label2">请点击按钮重新刷新</p>
                <Button onClick={this.props.refreshClick} className="btn" type="primary" inline>刷新</Button>
            </div>
        )
    }
}
