import * as ActionTypes from '../contants/ActionTypes';
import callApi from '../utils/api_caller';
import * as AuthenCommon from '../utils/auth_common'
import * as CallAPI from '../utils/api_caller'
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
export const changePassword = (status, data) => {
    return {
        type: ActionTypes.CHANGE_PASS_WORD,
        status,
        data
    }
}


