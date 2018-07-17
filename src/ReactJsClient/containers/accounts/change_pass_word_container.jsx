import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
//Todo: Code
import ChangePassWord from '../../components/accounts/change_pass_word.jsx'
import * as Action from '../../actions/action'
import * as ActionApi from '../../actions/action_api'
class ChangePassWordContainer extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let { onChangePassWord, changePassword, userInfo, delRequest } = this.props;
        return (
            <Fragment>
                <ChangePassWord
                    onChangePassWord={onChangePassWord}
                    changePassword={changePassword}
                    userInfo={userInfo}
                    delRequest={delRequest}
                />
            </Fragment>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        changePassword: state.change_password,
        userInfo: state.user_info
    }
}
const mapDispatchToProp = (dispatch, props) => {
    return {
        onChangePassWord: (data) => {
            dispatch(ActionApi.callAuthenAPI(`user/change_pass_word`, 'POST', data,'CHANGE_PASSWORD'))
        },
        delRequest: () => {
            dispatch(ActionApi.callAuthenAPI(`user/cancel_change_password`, 'POST', null,'DEL_REQUEST'))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProp)(ChangePassWordContainer);