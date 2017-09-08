/**
 * @description: 实时改变nav_title
 * @author: xzqiang
 * @create: 2017/5/17
 */
import {CRM_TITLE} from './actionsTypes'
export const onTitleChange = (currentTitle) => ({
  type: CRM_TITLE,
  currentTitle
});
