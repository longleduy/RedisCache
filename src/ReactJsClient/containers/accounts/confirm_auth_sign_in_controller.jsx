import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
//Todo: Code
import ConfirmAuthSignIn from '../../components/accounts/confirm_auth_sign_in.jsx'
import * as Action from '../../actions/action'
import * as ActionApi from '../../actions/action_api'
class ConfirmAuthSignInContainer extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let { confirmOk, userInfo } = this.props;
        return (
            <Fragment>
                <ConfirmAuthSignIn
                    confirmOk={confirmOk}
                    userInfo={userInfo}
                />
            </Fragment>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        userInfo: state.user_info
    }
}
const mapDispatchToProp = (dispatch, props) => {
    return {
        confirmOk: () => {
            dispatch(ActionApi.confirmOk())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProp)(ConfirmAuthSignInContainer);