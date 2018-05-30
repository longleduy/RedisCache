import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Container } from 'mdbreact'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import {connect} from 'react-redux'
//Todo: Component
import ContainerForm from '../../components/main/container.jsx'
//Todo: Untils

class ContainerContainer extends Component{
    constructor(props) {
        super(props);
        
    }
    render(){
        return(
            <ContainerForm />
        )
    }
    
}
export default ContainerContainer;