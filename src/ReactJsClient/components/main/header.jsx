import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Fa, NavItem, NavLinkContainer, NavLink } from 'mdbreact';
import { Container } from 'mdbreact'
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from "react-router-dom";
import PropTypes from 'prop-types'
//Todo: Component
import PrivateRoute from '../main/private_route.jsx'
import { showMenu } from '../utils.jsx'
//Todo: Utils
import * as AuthenCommon from '../../utils/auth_common'
class Header extends Component {
    constructor(props) {
        super(props);
    }
    displayButtonSign = () => {
        let isAuthen = AuthenCommon.isUserAuthenticated();
        if (isAuthen) {
            return <ReactCSSTransitionGroup transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                >
                <NavItem>
                    <NavLink onClick={this.onLogOut} to="#"><Fa icon="sign-out" />Sign out</NavLink>
                </NavItem></ReactCSSTransitionGroup>
        }
        else {
            if (location.pathname == '/sign_up') {
                return <ReactCSSTransitionGroup transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    >
                    <NavItem>
                        <NavLink to="/sign_in"><Fa icon="sign-in" />Sign in</NavLink>
                    </NavItem></ReactCSSTransitionGroup>
            } else if (location.pathname == '/sign_in') {
                return <ReactCSSTransitionGroup transitionName="example"
                transitionAppear={true} 
                transitionAppearTimeout={500}
                transitionEnterTimeout={500} 
                transitionLeaveTimeout={500}transitionLeaveTimeout={500}
                >
                    <NavItem>
                        <NavLink to="/sign_up"><Fa icon="user-plus" />Sign up</NavLink>
                    </NavItem>
                </ReactCSSTransitionGroup>
            }
            else {
                return <Fragment><ReactCSSTransitionGroup transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    >
                    <NavItem>
                        <NavLink to="/sign_in"><Fa icon="sign-in" />Sign in</NavLink>
                    </NavItem></ReactCSSTransitionGroup>
                    <ReactCSSTransitionGroup transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        >
                        <NavItem>
                            <NavLink to="/sign_up"><Fa icon="user-plus" />Sign up</NavLink>
                        </NavItem>
                    </ReactCSSTransitionGroup></Fragment>
            }
        }
    }
    onLogOut = (e) => {
        const { history, signOut } = this.props;
        signOut('DEFAULT');
        this.props.history.push('/');
    }
    render() {
        let { user_info } = this.props;
        return (
            <div className="my-header">
                {user_info.isAuthen && <label className="title-user-name">{user_info.user_name}</label>}
                <Navbar dark expand="md" scrolling fixed="top" className="my-nav">
                    <NavbarNav left>
                        {showMenu()}
                    </NavbarNav>
                    <NavbarNav right>
                        {this.displayButtonSign()}
                        {user_info.isAuthen && <img className="img-lvl-header" src={require("../../../../public/images/master-lvl.png")} />}
                    </NavbarNav>
                </Navbar>
            </div>
        )
    }
}
Header.propTypes = {
    history: PropTypes.object.isRequired
}
export default Header;