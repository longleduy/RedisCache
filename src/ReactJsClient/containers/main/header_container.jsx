import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Fa, NavItem, NavLinkContainer, NavLink } from 'mdbreact';
import { Container } from 'mdbreact'
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
//Todo: Component
import Header from '../../components/main/header.jsx'
//Todo: Actions
import * as  Action from '../../actions/action'
import * as  ActionAPI from '../../actions/action_api'
class HeaderContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { user_info, signOut, history } = this.props;
        return (
            <Header
                user_info={user_info}
                signOut = {signOut}
                history = {history}
            />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user_info: state.user_info
    }
}
const mapDispatchToProp = (dispatch, props) => {
    return {
        signOut : (status) => {
            dispatch(ActionAPI.signOut(status))
        }
    }
}
HeaderContainer.propTypes = {
    user_info: PropTypes.object.isRequired
}
export default withRouter(connect(mapStateToProps, mapDispatchToProp)(HeaderContainer));