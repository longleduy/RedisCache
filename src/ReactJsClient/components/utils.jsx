import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Fa, NavItem, NavLinkContainer, NavLink } from 'mdbreact';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import * as ContainerRoutes from '../components/routes/container_routes.jsx'
import requireAuth from '../containers/main/private_route_HOC.jsx'
//TODO: Custom menu link
const MyNavLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route path={to} exact={activeOnlyWhenExact}
            children={({ match }) => {
                let active = match ? 'active' : '';
                return (
                    <NavItem className={active}>
                        <NavLink to={to} exact={true}>
                            {label}
                        </NavLink>
                    </NavItem>
                )
            }}
        />
    )
}
const menus = [
    {
        name: 'Home',
        to: '/',
        exact: true
    },
    {
        name: 'Support',
        to: '/support',
        exact: true
    },
    {
        name: 'About',
        to: '/index',
        exact: true
    }
]
export const showMenu = () => {
    let menu = null;
    menu = menus.map((menu, key) => {
        return <MyNavLink
            key={key}
            label={menu.name}
            to={menu.to}
            activeOnlyWhenExact={menu.exact}
        />
    })
    return menu;
}
export const showPublicRoute = () => {
    let route = null;
    route = ContainerRoutes._public_routes.map((router, index) => {
        return <Route
            key={index}
            path={router.path}
            render={router.main}
            exact={router.exact}
        />
    })
    return route;
}
export const showPrivateRoute = () => {
    let route = null;
    route = ContainerRoutes._privte_routes.map((router, index) => {
        return <Route
            key={index}
            path={router.path}
            component={requireAuth(router.component)}
            exact={router.exact}
        />
    })
    return route;
}