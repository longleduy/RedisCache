import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import * as Common from '../utils/common'
import { Input, Button, Fa } from 'mdbreact'
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'
import * as CallAPI from '../utils/api_caller'
export default class Index extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
       // this.props.actFetchDataApiReques();
    }
    test = () => {
        CallAPI.callApiAuthen('user/test', 'POST', null);
    }
    render() {
        let {user_info} = this.props;
        let token = Common.getItemLocalStorage('token');
        if(token == null){
            return <Redirect to='/authen_failed' />
        }
        return (
            <Fragment>
                <ReactCSSTransitionGroup transitionName="example"
                    transitionAppear={true} transitionAppearTimeout={500}
                >
                    <div className="home-div">
                        <img className="img-lvl" src={require("../../../public/images/master-lvl.png")} />
                        <label className="title-lvl">{user_info.level} Level</label>
                        <Button block className="btn-sign-up" id="test" type="submit" onClick={this.test}>Demo</Button>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment >
        )
    }

}