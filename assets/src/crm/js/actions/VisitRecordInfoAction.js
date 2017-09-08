/**
 * @description: 客户拜访-拜访记录 action
 * @author: zy
 * @create: 2017/6/7
 */
import {REQUEST_VISIT_RECORD_INFO,RECEIVE_VISIT_RECORD_INFO} from './actionsTypes'

export const onReqVisitRecordInfo= (reqInfo) => (
  {type: REQUEST_VISIT_RECORD_INFO,
    reqInfo
  }
  );

export const onRecVisitRecordInfo = (dateList) => ({
  type: RECEIVE_VISIT_RECORD_INFO,
  dateList
});