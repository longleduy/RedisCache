import { combineReducers } from 'redux';
import user_info from './user_info';
import change_password from './accounts/change_password'
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware,
    push
} from "react-router-redux";
const myReducer = combineReducers({
    user_info,
    change_password,
    router: routerReducer
})
export default myReducer;