/**
 * @description: tabNumAction
 * @author: zy
 * @create: 2017/6/7
 */
import {CHANGE_TAB_NUM} from './actionsTypes'

export const onChangeTab = (num) => (
  {type: CHANGE_TAB_NUM,
      num
  }
  );

