import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import SignUp from './sign_up_form.jsx';
import SignIn from './sign_in_form.jsx';
import Index from '../index.jsx';
import Authen_Failed from './authen_failed.jsx'
import {  Route, Link, Switch } from "react-router-dom";
export default class Accounts extends Component {
    constructor(props) {
        super(props);
    }
    showRoutes = () => {
        let route = null;
        route = routes.map((router, index) => {
            return <Route key={index} path={router.path} render={router.main} exact={router.exact} />
        })
        return route;
    }
    render() {
        return (
            <Router>
                    <Switch>
                        {this.showRoutes()}
                    </Switch>
            </Router>
        )
    }

}