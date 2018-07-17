import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Fa, NavItem, NavLinkContainer, NavLink } from 'mdbreact';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import * as ContainerRoutes from '../components/routes/container_routes.jsx'
import requireAuth from '../containers/main/private_route_HOC.jsx'
//Todo: Custom menu link
const MyNavLink = ({ img, to, activeOnlyWhenExact }) => {
    return (
        <Route path={to} exact={activeOnlyWhenExact}
            children={({ match }) => {
                let active = match ? 'active' : '';
                return (
                    <NavItem className={active}>
                        <NavLink to={to} exact={true}>
                        <img src={require(`../../../public/images/icon/${img}.png`)} className="icon-menu"/>
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
        exact: true,
        img: 'home'
    },
    {
        name: 'Reactjs',
        to: '/reactjs',
        exact: true,
        img: 'reactjs'
    },
    {
        name: 'Java',
        to: '/java',
        exact: true,
        img: 'java'
    },
    {
        name: 'Support',
        to: '/nodejs',
        exact: true,
        img: 'nodejs'
    },
    {
        name: 'About',
        to: '/angular',
        exact: true,
        img: 'angular'
    },
    {
        name: 'Python',
        to: '/python',
        exact: true,
        img: 'python'
    }
]
export const showMenu = () => {
    let menu = null;
    menu = menus.map((menu, key) => {
        return <MyNavLink
            key={key}
            img={menu.img}
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
            component={requireAuth(router.component,router.title)}
            exact={router.exact}
        />
    })
    return route;
}