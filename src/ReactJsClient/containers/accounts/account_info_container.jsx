import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
//Todo: Code
import AccountInfo from '../../components/accounts/account_info.jsx'
import * as Action from '../../actions/action'
import * as ActionApi from '../../actions/action_api'
class AccountInfoContainer extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let { userInfo } = this.props;
        return (
            <Fragment>
                <AccountInfo
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
export default connect(mapStateToProps, null)(AccountInfoContainer);