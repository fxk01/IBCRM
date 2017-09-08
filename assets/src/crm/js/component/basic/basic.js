/**
 * Created by admin on 2017/5/5.
 * xzqing
 */
import React ,{Component} from  'react';
import {Link} from 'react-router'
import { Drawer, List, NavBar,Icon } from 'antd-mobile';
import './basic.less'
import {userInfo} from  '../../userInfo'

class Basic extends Component {

  constructor(props){
    super(props);
    this.state = {
      open: false,
      position: 'left',
      listIndex:0
    };
  }

  static defaultProps = {
    navBar:null
  };

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  };
	
	onHandleLink = (index) => {
		this.onOpenChange();
		this.setState({listIndex:index})
  };

  render() {
    const menu =
      [
        {
          imgUrl:require('../../../img/svg/ui-qiye-red.svg'),
          link:'/roadshow/ibcrm/etCustomer',
          title:'企业客户'
        },
        {
          imgUrl:require('../../../img/svg/ui-lianxiren.svg'),
          link:'/roadshow/ibcrm/contacts',
          title:'联系人'
        },
        {
          imgUrl:require('../../../img/svg/ui-xiangmu.svg'),
          link:'/roadshow/ibcrm/potential',
          title:'潜在业务机会'
        },
				{
					imgUrl:require('../../../img/svg/ui-kehu.svg'),
					link:'/roadshow/ibcrm/index',
					title:'客户拜访'
				},
        /*{
          imgUrl:require('../../../img/svg/main_5.svg'),
          link:'/roadshow/ibcrm/customerMap',
          title:'客户地图'
        },
        {
          imgUrl:require('../../../img/svg/main_6.svg'),
          link:'/roadshow/ibcrm/cardScanning',
          title:'名片扫描'
        }*/];
    const sidebar = (
    <div className="navMenu">
      <div className="htSide">
        <div className="header">
          <div className="content">
            <img className="left" src={require('../../../img/ui/logo.png')}/>
            <div className="right">
              <h3>员工号</h3>
              <p>{userInfo.userCode}</p>
            </div>
          </div>
        </div>
        <ul className="menu">
            {menu.map((i, index) => {
                return (
                <Link
                  key={index}
                  onClick={()=>{this.onHandleLink(index)}}
                  to={i.link}
                  >
                  <li className={this.state.listIndex===index?"activeLink":""}>
                    <div className="left"><Icon style={{color:"#fb655a"}} type={i.imgUrl}/></div>
                    <div className="right">{i.title}</div>
                  </li>
                </Link>);
            })}
        </ul>
      </div>
    </div>
    );

    const drawerProps = {
      open: this.state.open,
      position: this.state.position,
      onOpenChange: this.onOpenChange,
    };
    return (
      <div className="basic">
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          dragHandleStyle={{ display: 'none' }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
          sidebar={sidebar}
          {...drawerProps}
        >
          <NavBar iconName="null"
                  leftContent={[<Icon key="1" style={{color:"white",position:"relative",top:"2px"}} type={require("../../../img/svg/menu.svg")}/>]}
                  rightContent = {[this.props.navBar]}
                  onLeftClick={this.onOpenChange}>{this.props.title}</NavBar>
          {this.props.children}
        </Drawer>
    </div>);
  }
}

export default Basic;
