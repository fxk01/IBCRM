/**
 * @description: crm_title reducer
 * @author: xzqiang
 * @create: 2017/5/17
 */
import {
  CRM_TITLE
} from '../actions/actionsTypes'

const init = '客户拜访';

export default function titleChange(currentTitle = init, action) {
  switch (action.type) {
    case CRM_TITLE:
      return action.currentTitle;
    default:
      return currentTitle;
  }
}