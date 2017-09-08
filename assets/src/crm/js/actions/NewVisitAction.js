/**
 * zy
 * Created by admin on 2017/5/10.
 */
import {REQUEST_NEW_VISIT,RECEIVE_NEW_VISIT} from './actionsTypes'

export const onRequestNewVisit = (reqInfo) => (
    {type: REQUEST_NEW_VISIT,
      reqInfo
    }
  );

export const onReceiveNewVisit = (dateList) => ({
  type: RECEIVE_NEW_VISIT,
  dateList
});

