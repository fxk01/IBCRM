/**
 * @description: 客户拜访-拜访记录 reduce
 * @author: zy
 * @create: 2017/6/7
 */
import {REQUEST_OPPORTUNITY_BY_VISIT,RECEIVE_OPPORTUNITY_BY_VISIT} from '../actions/actionsTypes';

let opptTypeId;
const init = {
  isFetching: false,
  opptTypeId:null,
  items: {
    success:true,
    OppoListByVisit:[]
  }
};
export default function oppoByVisit(state=init, action) {
  switch (action.type) {
    case REQUEST_OPPORTUNITY_BY_VISIT:
			opptTypeId = action.reqInfo.visitId;
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_OPPORTUNITY_BY_VISIT:
      return {
        ...state,
        isFetching: false,
				opptTypeId:opptTypeId,
        items: {
          ...action.posts,
            OppoListByVisit:action.posts.OppoListByVisit||state.items.OppoListByVisit
        }
      };
    default:
      return state
  }
}
