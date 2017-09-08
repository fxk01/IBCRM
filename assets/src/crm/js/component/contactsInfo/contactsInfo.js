/**
 * Created by baizilin on 2017/6/21.
 * likaiming
 */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ContactsTabActions from '../../actions/ContactsTabActions'
import './contactsInfo.less'
import { RefreshControl, ListView, Toast } from 'antd-mobile'
import { TabContacts } from '../tabContacts/TabContacts'
import { default as Refresh } from '../../component/refresh/refresh'

let abnormalConnect = 0, resetList = 0;

class ContactsInfo extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            refreshing: false,
            dataSource: dataSource,
            data: '',
            isLoading: true,
            dataLen0: 1,
            load: true,
            width0: '100%',
            width1: '100%',
        };
    }

    componentDidMount() {
        this.props.contactsTabActions.onRequestContactsTab({contactRecord: {custName: decodeURIComponent(this.props.custName)}, start: 0});
        abnormalConnect = 1;
        this.setState({
            data: this.props.contactsTab.items.contactsTabList,
            isLoading: false,
            load: true,
        });
        this.manuallyRefresh = true;
        setTimeout(() => this.setState({
            refreshing: true,
            load: true,
        }), 10);
    }

    componentWillReceiveProps(nextProps) {
        try {
          if(!this.props.contactsTab.items.success && !nextProps.contactsTab.items.success) {
            Toast.fail('加载数据失败',1);
          }
          if(nextProps.contactsTab.items.total > 0) {
            this.setState({
              width0: '92%',
            });
          } else if(nextProps.contactsTab.items.total === 0) {
            this.setState({
              width0: '100%',
              width1: '100%',
            });
          }
          const nextList = nextProps.contactsTab.items.contactsTabList;
          const oldList = this.props.contactsTab.items.contactsTabList;
          if (nextList !== oldList && nextProps.contactsTab.items.success) {
            abnormalConnect = 0;
            this.setState({
              data: nextProps.contactsTab.items.contactsTabList,
              load: false,
              width1: '100%',
            });
          }
        } catch (e) {
            console.log(e.message);
        }
    }

    onRefresh = () => {
        if (!this.manuallyRefresh) {
            this.setState({
                refreshing: true,
                load: true,
            });
            abnormalConnect = 1;
            this.props.contactsTabActions.onRequestContactsTab({contactRecord: {custName: decodeURIComponent(this.props.custName)}, start: 0});
        } else {
            this.manuallyRefresh = false;
        }
        setTimeout(() => {
            this.setState({
                refreshing: false,
            });
        }, 500);
    };

    onEndReached() {
        if(this.state.isLoading || !(this.props.contactsTab.items.total  - this.props.contactsTab.items.contactsTabList.length)){
            return ;
        }
        this.setState({
            isLoading: true,
            load: true,
        });
        const listNum = this.props.contactsTab.items.contactsTabList.length;
        resetList = listNum;
        this.props.contactsTabActions.onRequestContactsTab({
            contactRecord: {custName: decodeURIComponent(this.props.custName)},
            start: listNum,
        });
    };

    onHandleRefresh() {
      Toast.loading('加载中...', 0);
      this.props.contactsTabActions.onRequestContactsTab({contactRecord: {custName: decodeURIComponent(this.props.custName)}, start: 0});
    }

    render() {
        const { contactsTab } = this.props;
        const row = (rowData, sectionID, rowID) => {
            return (
                <TabContacts
                    rowData={rowData}
                />
            );
        };
        return (
            <div className="contactsInfo">
                {
                  contactsTab.items.success ?
                        <ListView
                            dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                            renderRow={row}
                            initialListSize={6}
                            pageSize={6}
                            onEndReached={this.onEndReached.bind(this)}
                            scrollRenderAheadDistance={200}
                            scrollEventThrottle={20}
                            scrollerOptions={{ scrollbars: true }}
                            renderFooter={() => {
                                if(this.state.dataLen0 == 0){
                                    return(
                                        <div style={{ padding: 30, textAlign: 'center', width: '100%' }}>
                                          暂无数据！！！
                                        </div>
                                    )
                                } else if(contactsTab.items.total === 0) {
                                    return(
                                        <div style={{ padding: 30, textAlign: 'center', width: '100%' }}>
                                            暂无数据....
                                        </div>
                                    )
                                } else {
                                    return(
                                        <div style={{
                                            padding: 30,
                                            textAlign: 'center',
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                            width: this.state.width1,
                                        }}>
                                            {this.state.load ? '加载中...' : '加载完毕'}
                                        </div>
                                    )
                                }
                            }}
                            refreshControl={<RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh.bind(this)}
                                style={{width: this.state.width0}}
                            />}
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
    contactsTab: state.contactsTab,
});

const mapDispatchToProps = dispatch => ({
    contactsTabActions: bindActionCreators(ContactsTabActions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ContactsInfo)