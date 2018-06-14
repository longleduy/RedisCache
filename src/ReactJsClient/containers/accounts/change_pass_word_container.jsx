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
        let { onChangePassWord, changePassword } = this.props;
        return (
            <Fragment>
                <ChangePassWord
                    onChangePassWord={onChangePassWord}
                    changePassword={changePassword}
                />
            </Fragment>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        changePassword: state.change_password
    }
}
const mapDispatchToProp = (dispatch, props) => {
    return {
        onChangePassWord: (data) => {
            dispatch(ActionApi.changePassword(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProp)(ChangePassWordContainer);