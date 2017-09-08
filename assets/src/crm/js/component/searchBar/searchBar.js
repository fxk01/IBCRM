/**
 * @zy
 * @@ 2017-5-9 establish
 * update@xzq
 */

import './searchBar.less';
import React ,{ Component } from  'react';
import { SearchBar,Icon,DatePicker,Picker} from 'antd-mobile';

class DateChild extends Component{
    render(){
        return(
            <div onClick={this.props.onClick}>
                <Icon type={require('../../../img/svg/date.svg')}/>
            </div>
        )
    }
}

class CustomChildren extends React.Component{
    render(){
        return(
            <div
                onClick={this.props.onClick}
            >
                <div className="left">
                    <span>{this.props.leftValue[0]==="all"?"全部":"我的"}</span>
                    <Icon style={{width:"0.28rem",height:"0.2rem"}} type={require('../../../img/svg/ui-t.svg')}/>
                </div>
            </div>
        )
    }
}

class MySearchBar extends Component {
	static defaultProps={
		showLeftValue:()=>{},
    defaultValue:"mine"
	};
    
    state = {
        dpValue: null,
        searchValue:this.props.defaultV||"",
        focused:false,
        leftValueType:[
            [
                {
                    label: '全部',
                    value: 'all',
                },
                {
                    label: '我的',
                    value: 'mine',
                },
            ]
        ],
        leftValue:[this.props.defaultValue],
    };
   
    onHandleChange=(val)=>{
			this.setState({searchValue:val});
			this.props.onChange(val);
    };
    
    onHandleDataChange = (val)=>{
       let searchData =  `${val.year()}-${(val.month()+1)<10?`0${val.month()+1}`:`${val.month()+1}`}-${val.date()<10?`0${val.date()}`:`${val.date()}`}`
      this.setState({
				dpValue: val ,
				// focused:true,
				searchValue:searchData
			});
			this.props.onHandleDataChange(searchData);
    };



    render(){
        return(
            <div>
                <div className="mySearchBar">
                    <Picker
                        data={this.state.leftValueType}
                        title="请选择"
                        cascade={false}
                        extra="请选择(可选)"
                        value={this.state.leftValue}
                        onChange={(value) => {
                            this.setState({leftValue: value});
                            this.props.showLeftValue(value);
                        }}
                    >
                        <CustomChildren leftValue={this.state.leftValue}>选择</CustomChildren>
                    </Picker>
                    <div className="center">
                        <SearchBar
                          onSubmit={this.props.onSubmit}
                            onFocus={()=>{this.setState({focused:false})}}
                            focused={this.state.focused}
                            onChange={this.onHandleChange}
                            cancelText=""
                            value={this.state.searchValue}
                            placeholder="搜索"
                        />
                    </div>
                    <div className="right">
                        <DatePicker
                            mode="date"
                            title="选择日期"
                            extra="请选择(可选)"
                            value={this.state.dpValue}
                            onChange={this.onHandleDataChange}
                        >
                            <DateChild ref="test"/>
                        </DatePicker>
                    </div>
                </div>
            </div>
        )
    }
}

export default MySearchBar;