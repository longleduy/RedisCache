import * as ActionTypes from '../contants/ActionTypes';
import * as CallAPI from '../utils/api_caller';
import * as Action from './action'
import * as AuthenCommon from '../utils/auth_common'
export const callAuthenAPI = (endPoint, method = 'GET', data) => {
    return async (dispatch) => {
        try {
            let res = await CallAPI.callApiAuthen(endPoint, method, data)
            if (res.status == 202) {
                dispatch(signOut('BAD_REQUEST')) 
            }
        } catch (error) {
            throw error
        }
    }
}
export const signOut = (status) => {
    return async (dispatch) => {
        try {
            let res = await CallAPI.callApi('user/sign_out','GET',null);
            if(res.status == 200){
                dispatch(Action.signOut(status));
            }
        } catch (error) {
            throw error
        }
    }
}
