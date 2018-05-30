import React,{ Fragment, Component } from 'react';
import { connect } from 'react-redux';
import SignIn from '../../components/accounts/sign_in_form.jsx'
import * as Action from '../../actions/action'
class SignInContainer extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let { signInSucess, user_info } = this.props;
        return(
            <Fragment>
                <SignIn
                    signInSucess={signInSucess}
                    user_info ={user_info}
                    />
            </Fragment>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        user_info: state.user_info
    }
}
const mapDispatchToProp = (dispatch,props) => {
    return {
        signInSucess : (data) => {
            dispatch(Action.signInSucess(data))
        }
    }
}
export default connect(null,mapDispatchToProp)(SignInContainer);