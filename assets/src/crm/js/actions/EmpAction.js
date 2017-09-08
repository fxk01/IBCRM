/**
 * zy
 * Created by admin on 2017/5/10.
 */
import {REQUEST_EMP,RECEIVE_EMP} from './actionsTypes'

export const onRequestEmpList = (reqInfo) => (
    {type: REQUEST_EMP,
      reqInfo
    }
  );

export const onReceiveEmpList = (dateList) => ({
  type: RECEIVE_EMP,
  dateList
});

