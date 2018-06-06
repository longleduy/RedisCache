import React, { Component, Fragment } from 'react'
import {Redirect} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
export default class ConfirmAuthSignIn extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.confirmOk();
    }
    render() {
        let { userInfo } = this.props;
        if (userInfo.isAuthen== true) {
            return <Redirect to='index' />
        }
        return (
            <Fragment>
                <ReactCSSTransitionGroup transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <form onSubmit={this.onSignIn}>
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6 sign_form">
                                <div className="row">
                                    <div className="col-md-12 div-user-img">
                                        <span className="big-title" id='sign_lbl'>Login Confirm</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </form>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }

}