/**
 * @zy
 * @@ 2017-5-9 establish
 * update@xzq
 */

import './commonSearch.less';
import React ,{ Component } from  'react';
import { SearchBar,Icon,Picker} from 'antd-mobile';

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

class CommonSearch extends Component {
	static defaultProps={
		showLeftValue:()=>{},
		defaultV:"",
		hasLeft:true,//是否有左边
		defaultValue:"mine"
	};
	
	state = {
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
	
	render(){
		return(
      <div>
          <div className="commonSearch">
			  {this.props.hasLeft?(
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
					  <CustomChildren
						  leftValue={this.state.leftValue}
					  >
						  选择
					  </CustomChildren>
				  </Picker>
			  ):(
				  <div className="space"/>
			  )}
              <div className="center">
                  <SearchBar
                    onSubmit={this.props.onSubmit}
                    onChange={this.props.onChange}
                    cancelText=""
                    defaultValue={this.props.defaultV}
                    placeholder={this.props.placeholder}
                  />
              </div>
              <div className="right" onClick={this.props.onSubmit}>
                  搜索
              </div>
          </div>
      </div>
		)
	}
}

export default CommonSearch;