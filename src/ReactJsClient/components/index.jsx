import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import * as Common from '../utils/common'
import { Input, Button, Fa } from 'mdbreact'
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'
import * as ActionAPI from '../actions/action_api'
export default class Index extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
       // this.props.actFetchDataApiReques();
    }
    testAUthen = () => {
      this.props.test('user/test', 'POST', null);
    }
    render() {
        let {user_info} = this.props;
        return (
            <Fragment>
                <ReactCSSTransitionGroup transitionName="example"
                    transitionAppear={true} transitionAppearTimeout={500}
                >
                    <div className="home-div">
                        <img className="img-lvl" src={require("../../../public/images/master-lvl.png")} />
                        <label className="title-lvl">{user_info.level} Level</label>
                    </div>
                    <Button onClick = {this.testAUthen}>Test Authentication</Button>
                </ReactCSSTransitionGroup>
            </Fragment >
        )
    }

}