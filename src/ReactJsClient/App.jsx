import React, { Component, Fragment } from 'react';
import Login from './components/Login.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <div className="row parent-div">
                    <div className="container">
                        <Login />
                    </div>
                </div>
            </Fragment>
        )
    }
}