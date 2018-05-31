import * as ActionTypes from '../contants/ActionTypes';
import callApi from '../utils/api_caller';
import * as AuthenCommon from '../utils/auth_common'
export const signInSucess = (data) => {
    return {
        type: ActionTypes.SIGN_IN_SUCCESS,
        data
    }
}
export const signOut = (status = 'DEFAULT') => {
    AuthenCommon.deAuthenticateUser();
    return {
        type: ActionTypes.SIGN_OUT,
        status
    }
}
export const actFetchDataApiReques = () => {
    return (dispatch) => {
        return callApi('items', 'GET', null)
            .then(res => {
                actFetchDataApiRedux(res.data);
            })
    }
}

