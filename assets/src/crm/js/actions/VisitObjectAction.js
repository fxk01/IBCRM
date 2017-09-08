/**
 * zy
 * Created by admin on 2017/5/10.
 */
import {REQUEST_VISIT_OBJECT,RECEIVE_VISIT_OBJECT} from './actionsTypes'

export const onRequestVisitObjectList = (reqInfo) => (
    {type: REQUEST_VISIT_OBJECT,
      reqInfo
    }
  );

export const onReceiveVisitObjectList = (dateList) => ({
  type: RECEIVE_VISIT_OBJECT,
  dateList
});

