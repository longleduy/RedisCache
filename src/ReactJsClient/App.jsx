import React, { Component, Fragment } from 'react';
import Accounts from './components/accounts/account.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Fa, NavItem, NavLinkContainer, NavLink } from 'mdbreact';
import { Container, Header } from 'mdbreact'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
//Todo: Component
import HeaderContainer from './containers/main/header_container.jsx'
import ContainerContainer from './containers/main/container_container.jsx'
//Todo: Untils
import * as AuthenCommon from './utils/auth_common'

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <HeaderContainer />
                <ContainerContainer />
            </Fragment>
        )
    }

}
