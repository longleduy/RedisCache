import {combineReducers} from 'redux';
import products from './products';
import cards from './cards';
import login from './login';
import productInfo from './productInfo';
var myReducer = combineReducers({
    login
})
export default myReducer;