import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import * as Common from '../utils/common'
import { Input, Button, Fa } from 'mdbreact'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import * as ActionAPI from '../actions/action_api'
import * as CallAPI from '../utils/api_caller'
import * as Action from '../actions/action'
import * as Authen from '../utils/auth_common'
import { store } from '../index'
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
        };
    }
    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    testAUthen = () => {
        CallAPI.callApi('session/save', 'GET', null);
    }
    view = () => {
        this.props.test('session/view', 'POST', null);
    }
    render() {
        let { user_info } = this.props;
        let level = user_info.level.toLowerCase();
        return (
            <Fragment>
                <ReactCSSTransitionGroup transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <div className="home-div">
                    <div className = 'col-md-6 rank-icon'>

                    </div>
                        <img className="img-lvl" src={require(`../../../public/images/rank/${level ? level : 'legend'}-rank.png`)} />
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment >
        )
    }

}