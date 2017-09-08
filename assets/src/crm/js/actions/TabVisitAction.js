/**
 * @description: 企业客户-客户拜访action
 * @author: zy
 * @create: 2017/6/7
 */
import {REQUEST_TAB_VISIT_LIST,RECEIVE_TAB_VISIT_LIST,CLEAR_TAB_VISTI_LIST} from './actionsTypes'

export const onRequestTabVisitList = (reqInfo) => (
    {type: REQUEST_TAB_VISIT_LIST,
      reqInfo
    }
  );

export const onReceiveTabVisitList = (dateList) => ({
  type: RECEIVE_TAB_VISIT_LIST,
  dateList
});

export const onClearTabVisitList=()=>({
    type:CLEAR_TAB_VISTI_LIST
})
