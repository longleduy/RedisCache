//TODO: Module
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import jwt from 'jsonwebtoken';
import App from './App.jsx';

import Favicon from 'react-favicon';
import 'babel-polyfill';
import "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'mdbreact/dist/mdbreact.js';
import "../../public/scss/materialui.scss";
import Logo from "../../public/images/logo.png";
import "font-awesome/css/font-awesome.min.css";
// import "../public/css/materialui.min.css";
import * as Common from '../ReactJsClient/utils/auth_common';
import { signInSucess, signOut } from '../ReactJsClient/actions/action'
import * as ActionAPI from './actions/action_api'
import * as CallAPI from './utils/api_caller'
//TODO: Khởi tạo store
import { applyMiddleware, createStore } from 'redux';
//TODO: Import reducer
import myReducer from './reducers/index';
//TODO: Kết nối react với redux
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
export const store = createStore(myReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

if (Common.getToken()) {
    try {
        let infoUser = jwt.decode(Common.getToken());
        if (infoUser)
            store.dispatch(signInSucess(infoUser))
        else {
            CallAPI.callApi('user/sign_out', 'GET', null);
            store.dispatch(signOut('BAD_REQUEST'))
        }
    } catch (error) {
        CallAPI.callApi('user/sign_out', 'GET', null);
        store.dispatch(signOut('BAD_REQUEST'))
    }
}
ReactDOM.render(<div><Favicon url={Logo} /><Provider store={store}><Router><App /></Router></Provider></div>, document.querySelector('#root'));
