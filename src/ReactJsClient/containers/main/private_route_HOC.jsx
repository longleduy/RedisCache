import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

export default function (ComposedComponent) {
    class Authentication extends Component {
        componentWillMount() {
            let {user_info} = this.props;
            if (!user_info.isAuthen) {
                this.props.history.push('/authen_failed');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.user_info.isAuthen) {
                this.props.history.push('/authen_failed');
            }
        }
        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

 const mapStateToProps = (state) => {
     return {
         user_info: state.user_info
     }
 }
    return  withRouter(connect(mapStateToProps, null)(Authentication));
}