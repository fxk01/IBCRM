/**
 * zy
 * Created by admin on 2017/5/10.
 */
import {REQUEST_OPPORTUNITY_BY_VISIT,RECEIVE_OPPORTUNITY_BY_VISIT} from './actionsTypes'

export const onReqOpportunityByVisit = (reqInfo) => (
  {type: REQUEST_OPPORTUNITY_BY_VISIT,
    reqInfo
  }
  );

export const onRecOpportunityByVisit = (dateList) => ({
  type: RECEIVE_OPPORTUNITY_BY_VISIT,
  dateList
});