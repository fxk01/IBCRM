/**
 * @description: 修改tab Reducer
 * @author: zy
 * @create: 2017/6/7
 */
import {
    CHANGE_TAB_NUM
} from '../actions/actionsTypes'

export default function changeTabNum(state = 0, action) {
    switch (action.type) {
        case CHANGE_TAB_NUM:
            return action.num;
        default:
            return state;
    }
}