import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
//Todo: Code
import EditProfile from '../../components/accounts/edit_profile.jsx'
import SignIn from '../../components/accounts/sign_in_form.jsx'
import * as Action from '../../actions/action'
import * as ActionApi from '../../actions/action_api'
class EditProfileController extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let {upload, user_info} = this.props;
        return (
            <Fragment>
                <EditProfile 
                user_info = {user_info}
                upload ={upload}/>
            </Fragment>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        user_info: state.user_info
    }
}
const mapDispatchToProp = (dispatch, props) => {
    return {
        upload: (data) => {
            dispatch(ActionApi.callAuthenAPI(`user/upload_avatar`, 'POST', data,'UPLOAD_AVATAR'))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProp)(EditProfileController);