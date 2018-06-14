import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import * as Common from '../../utils/common'
import { Input, Button, Fa } from 'mdbreact'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import * as ActionAPI from '../../actions/action_api'
import * as CallAPI from '../../utils/api_caller'
import * as Action from '../../actions/action'
import * as Authen from '../../utils/auth_common'
import { store } from '../../index'
export default class AccountInfo extends Component {
    constructor(props) {
        super(props);
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
                    <div className="user-info-form">
                        <div className='col-md-2'></div>
                        <div className='col-md-4 rank-icon'>
                            <img className="img-lvl" src={require(`../../../../public/images/rank/${level ? level : 'legend'}-rank.png`)} />
                        </div>
                        <div className='col-md-4 user-info'>
                            <div className="col-md-12">
                                <label className="col-md-6">
                                    User name :
                                </label>
                                <label className="col-md-6">
                                    {user_info.user_name}
                                </label>

                                <label className="col-md-6">
                                    User ID :
                                </label>
                                <label className="col-md-6">
                                    {user_info.email}
                                </label>

                                <label className="col-md-6">
                                    Rank:
                                </label>
                                <label className="col-md-6">
                                    {user_info.level}
                                </label>

                                <label className="col-md-6">
                                    Provider:
                                </label>
                                <label className="col-md-6">
                                    {user_info.provider}
                                </label>
                            </div>
                        </div>
                        <div className='col-md-2'></div>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment >
        )
    }

}