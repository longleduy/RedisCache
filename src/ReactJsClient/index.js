//TODO: Module
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App.jsx';
import Favicon from 'react-favicon';
import "jquery";
import "../../public/scss/materialui.scss";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css";
import Logo from "../../public/images/logo.png";
import "font-awesome/css/font-awesome.min.css";
// import "../public/css/materialui.min.css";

//TODO: Khởi tạo store
import { applyMiddleware,createStore } from 'redux';
//TODO: Import reducer
import myReducer from './reducers/index';
//TODO: Kết nối react với redux
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
const store = createStore(myReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),applyMiddleware(thunk));

ReactDOM.render(<div><Favicon url={Logo}/><Provider store={store}><App  /></Provider></div>,document.querySelector('#root'));
