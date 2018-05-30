import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Fa, NavItem, NavLinkContainer, NavLink } from 'mdbreact';
import { Container, Header } from 'mdbreact'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
//Todo: Component

//Todo: Untils
import * as AuthenCommon from '../../utils/auth_common'

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route
        {...rest}
        render={props =>
            AuthenCommon.isUserAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/authen_failed",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
}