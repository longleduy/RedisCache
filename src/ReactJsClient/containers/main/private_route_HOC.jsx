import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import * as Action from '../../actions/action'
export default function (ComposedComponent, title) {
    class Authentication extends Component {
        componentWillMount() {
            let {user_info} = this.props;
            if (!user_info.isAuthen) {
                this.props.history.push('/authen_failed');
            }
            //this.props.setTitle(title);
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.user_info.isAuthen) {
                this.props.history.push('/authen_failed');
            }
            //this.props.setTitle(title);
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
//  const mapDispatchToProp = (dispatch, props) => {
//     return {
//         setTitle : (title) => {
//             dispatch(Action.setTitle(title))
//         }
//     }
// }
    return  withRouter(connect(mapStateToProps, null)(Authentication));
}