/**
 * @description: 客户拜访界面导航右侧配置
 * @author: likaiming
 * @create: 2017-05-19 14:59:42
 * @update: likaiming (2017-05-19 14:59:42)
 */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TitleAction from '../actions/TitleAction.js'
import * as ContactsActions from '../actions/ContactsActioin'
import * as TabNumActive from '../actions/TabNumActions.js';
import { browserHistory } from 'react-router'
// import { ContactsButton } from  '../component/contactsButton/ContactsButton'
import { ContactsItem } from '../component/contactsItem/contactsItem'
import { WingBlank, SearchBar, RefreshControl, ListView, List, Icon, Toast } from 'antd-mobile'
import { default as Refresh } from '../component/refresh/refresh'
import CommonSearch from '../component/commonSearch/commonSearch'
import {sendPageMessage} from "../../../../middlewares/com";

let timer, contactName, resetList,isOwn="mine";

class ListViewBody extends React.Component {
    render(){
        return (
            <div className="am-list-body my-body">
                <span style={{ display: 'none' }}>you can custom body wrap element</span>
                <List>
                    {this.props.children}
                </List>
            </div>
        )
    }
}

export class ContactsNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <WingBlank size="lg" style={{marginRight: '0rem'}}>
                    <Icon
                        className="icon"
                        type={require("../../img/svg/ui-xinzeng2.svg")}
                        onClick={() => browserHistory.push('/roadshow/ibcrm/act/newContacts')}
                    />
                </WingBlank>
            </div>
        )
    }
}

export class Contacts extends React.Component {
    constructor(props){
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (rw1, rw2) => rw1 !== rw2,
        });
        this.state = {
            arrClose: [],
            width0: '100%',
            listChecked: [],
            showCheckBox: 3,
            data: this.props.contacts.items.contactsList,
            refreshing: this.props.contacts.isFetching,
            isLoading: true,
            value: '',
            listShowClass: ['am-list-item-box'].join().replace(',', ' '),
            contactsItemClass: ['contactsItem', 'contactsItem03Lf'].join().replace(',', ' '),
            dataSource: dataSource,
            hasMore: false,
        };
    }

    componentDidMount(){
			sendPageMessage("企业客户","联系人");
      if(!this.props.contacts.isFetching){
            this.setState({
                refreshing: true,
                value: '',
            });
            // this.props.ContactsActions.onRequestContactsList({
            //     contactRecord: {contactName},
            //     start: 0
            // });
        }
      if(this.props.contacts.items.total && this.props.contacts.items.total >= this.props.contacts.items.contactsList.length){
            this.setState({
                // showCheckBox: 1,
                isLoading: false,
                refreshing: false,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.contacts.items.total > 0) {
            this.setState({
                width0: '92%'
            });
        } else if(nextProps.contacts.items.total === 0) {
            this.setState({
                width0: '100%'
            });
        }
        if( this.state.showCheckBox === 3) {
            if(nextProps.contacts.items.success) {
              Toast.hide();
          } else if(!this.props.contacts.items.success && !nextProps.contacts.items.success) {
              Toast.fail('加载数据失败',1);
          }
        }
        const nextList = nextProps.contacts.items.contactsList;
        const oldList = this.props.contacts.items.contactsList;

        if ( nextList!== oldList ) {
            this.setState({
                hasMore:(nextList.length - resetList)>=10,
                refreshing: nextProps.contacts.isFetching,
                // showCheckBox: 4,
                isLoading: false,
                data: nextProps.contacts.items.contactsList,
            });
        }
    }

    componentWillUnmount(){
      clearTimeout(timer);
      sendRemoveDomScript('lxr');
    }

    componentWillMount() {
        this.props.titleAction.onTitleChange("联系人");
        this.setState({
            arrClose: [1],
        });
    }

    onRefresh = () => {
        resetList = 0;
        let basis = /^\d{1,11}$/.test(contactName);
        this.setState({
            refreshing: true,
            listShowClass: ['am-list-item-box'].join().replace(',', ' '),
            contactsItemClass: ['contactsItem', 'contactsItem03Lf'].join().replace(',', ' '),
            arrClose: [1]
        });
        if(basis){
            this.props.ContactsActions.onRequestContactsList({
                contactRecord: {
                  mobile: this.state.value,
									createBy:isOwn
                },
                start: 0,
            })
        } else {
            this.props.ContactsActions.onRequestContactsList({
                contactRecord: {
                  contactName: this.state.value,
                  createBy:isOwn
                },
                start: 0,
            })
        }
    };

    onHandleOpen(){
        this.setState({
            // showCheckBox: 4,
            listShowClass: ['am-list-item-box', 'contactsShowCheckBox'].join().replace(',', ' '),
            contactsItemClass: ['contactsItem'].join().replace(',', ' '),
            arrClose: []
        })
    }

    onHandleClose(){
        this.setState({
            // showCheckBox: 1,
            listShowClass: ['am-list-item-box', 'contactsHiddenCheckBox'].join().replace(',', ' '),
            contactsItemClass: ['contactsItem'].join().replace(',', ' '),
            arrClose: [1]
        })
    }

    onHandleSend(){
        this.setState({
            // showCheckBox: 4,
            arrClose: [1],
            listShowClass: ['am-list-item-box', 'contactsHiddenCheckBox'].join().replace(',', ' '),
            listChecked: []
        })
    }

    onHandleSearch(){
        resetList = 0;
        this.refs.listView && this.refs.listView.refs.listview.scrollTo(0, 0);
        // this.props.ContactsActions.onRequestContactsList({
        //     contactRecord: {contactName},
        //     start: 0,
        // });
        this.setState({
            arrClose: [1],
            refreshing: true,
        })
    }

    onEndReached(){
        let basis = /^\d{1,11}$/.test(contactName);
        if (this.state.isLoading || !(this.props.contacts.items.total - this.props.contacts.items.contactsList.length)) {
            return;
        }
        this.setState({ isLoading: true });
        const listNum = this.props.contacts.items.contactsList.length;
        resetList = listNum;
        if(basis){
            this.props.ContactsActions.onRequestContactsList({
                contactRecord: {
                    mobile: this.state.value,
                  createBy:isOwn
                },
                start: listNum,
            })
        } else {
            this.props.ContactsActions.onRequestContactsList({
                contactRecord: {
                  contactName: this.state.value,
                  createBy:isOwn
                },
                start: listNum,
            })
        }
    }

    onHandleStart() {
        if(this.state.showCheckBox === 2) return ;
        timer = setTimeout(()=>{
            this.setState({
                // showCheckBox: 4,
                arrClose: [],
                listShowClass: ['am-list-item-box', 'contactsShowCheckBox'].join().replace(',', ' '),
                contactsItemClass: ['contactsItem'].join().replace(',', ' ')
            });
        },500);
    }

    onHandleEnd (){
        clearTimeout(timer);
    }

    onChange = (value) => {
        contactName = value;
        if(this.state.showCheckBox !== 3){
            this.setState({
                value,
                showCheckBox: 3,
                isLoading: false,
            })
        } else {
            this.setState({
                value,
                isLoading: false,
            });
        }
    };

    onHandleClickList2(key_v){
        if((this.state.showCheckBox == 1 || this.state.showCheckBox == 3 || this.state.showCheckBox == 4) && this.state.arrClose.length !== 0) {
            return;
        }
        let arr =  this.state.listChecked;
        if(arr.indexOf(key_v) === -1){
            arr.push(key_v);
            this.setState({
                listChecked: arr
            })
        }else{
            const del = arr.indexOf(key_v);
            arr.splice(del,1);
            this.setState({
                listChecked: arr
            })
        }
    }

    onHandleRefresh() {
        resetList = 0;
        this.setState({
            showCheckBox:3,
        });
        Toast.loading('加载中...', 0);
        this.props.ContactsActions.onRequestContactsList({
            contactRecord: {contactName,createBy:isOwn},
            start: 0,
        });
    }

    onOwn(val){
        isOwn = val[0]
  }

    render() {
			const {contacts} = this.props;
        const href = window.location.href.split('/');
        const row = (rowData, sectionID, rowID) => {
            return (
                <ContactsItem
                    data={rowData}
                    checked={this.state.listChecked.indexOf(parseInt(rowID)+1)!==-1}
                    key={parseInt(rowID)}
                    key_v={parseInt(rowID)+1}
                    className={this.state.contactsItemClass}
                    showCheckBox = {this.state.showCheckBox}
                    touchS={this.onHandleStart.bind(this)}
                    touchE={this.onHandleEnd.bind(this)}
                    onList = {()=>{this.onHandleClickList()}}
                    onList2 = {(key_v)=>{this.onHandleClickList2(key_v)}}
                    isOwn={contacts.ownerScope==="mine"}
                />
            );
        };
        return (
        	
            <div className="Contact">
                <div className="contact-bg">
                    <CommonSearch
                        contactsHref={href[href.length - 1]}
                        onSubmit={this.onHandleSearch.bind(this)}
                        onChange={this.onChange}
                        ref = "searchCustomer"
                        placeholder="请输入联系人或者手机号码"
                        showLeftValue={this.onOwn.bind(this)}
												defaultV = {contacts.searchV||""}
                        defaultValue={contacts.ownerScope}
                    />
                </div>
                {
                    contacts.items.success ?
                        <ListView
                            className={this.state.listShowClass + ' contactListView'}
                            dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                            ref='listView'
                            renderBodyComponent={() => <ListViewBody /> }
                            renderRow={row}
                            initialListSize={6}
                            pageSize={6}
                            scrollRenderAheadDistance={200}
                            scrollEventThrottle={20}
                            onEndReachedThreshold={20}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
                                    style={{width: this.state.width0}}
                                />
                            }
                            renderFooter={() => {
                                if(this.state.showCheckBox == 3 && contacts.items.total > 0){
                                    return (
                                        <div style={{
                                            padding: 30,
                                            textAlign: 'center',
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                        }}>
                                            {this.state.isLoading ? '加载中...' : '加载完毕'}
                                        </div>
                                    )
                                }
                                if(contacts.items.total == 0){
                                    return (
                                        <div style={{ padding: 30, textAlign: 'center', width: '109%'}}>
                                            暂无数据...
                                        </div>
                                    )
                                }
                            }}
                            onEndReached={this.onEndReached.bind(this)}
                            scrollerOptions = {{ scrollbars: true }}
                        /> :
                        <Refresh
                            refreshClick = {this.onHandleRefresh.bind(this)}
                        />
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    title: state.crmTitle,
    contacts: state.contacts,
});

const mapDispatchToProps = dispatch => ({
    titleAction: bindActionCreators(TitleAction, dispatch),
    ContactsActions: bindActionCreators(ContactsActions, dispatch),
    tabNumAction: bindActionCreators(TabNumActive, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Contacts)