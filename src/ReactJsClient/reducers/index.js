import {combineReducers} from 'redux';
import user_info from './user_info';
import change_password from './accounts/change_password'
const myReducer = combineReducers({
    user_info,
    change_password
})
export default myReducer;