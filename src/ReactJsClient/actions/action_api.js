import * as ActionTypes from '../contants/ActionTypes';
import * as CallAPI from '../utils/api_caller';
import * as Action from './action'
import * as AuthenCommon from '../utils/auth_common'
import jwt from 'jsonwebtoken'
export const callAuthenAPI = (endPoint, method = 'GET', data) => {
    return async (dispatch) => {
        try {
            let res = await CallAPI.callApiAuthen(endPoint, method, data)
            if (res.status == 204) {
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
            let res = await CallAPI.callApi('user/sign_out', 'GET', { name: 'long' });
            if (res.status == 200) {
                dispatch(Action.signOut(status))
            }
        } catch (error) {
            throw error
        }
    }
}
export const signInAuth = (authenApplication) => {
    return async (dispatch) => {
        try {
            let res = await CallAPI.callApi(`auth/google`, 'GET', null);
            if (res.status == 200) {
                AuthenCommon.setToken(res.data.token)
                let infoUser = jwt.decode(res.data.token);
                dispatch(Action.signInSucess(infoUser))
            }
        } catch (error) {
            throw error
        }
    }
}
export const confirmOk = () => {
    return async (dispatch) => {
        try {
            let res = await CallAPI.callApi(`auth/auth_sign_in`, 'POST', null);
            if (res.status == 200) {
                AuthenCommon.setToken(res.data.token)
                let infoUser = jwt.decode(res.data.token);
                dispatch(Action.signInSucess(infoUser))
            }
        } catch (error) {
            throw error
        }
    }
}
export const changePassword = (data) => {
    return async (dispatch) => {
        try {
            let res = await CallAPI.callApiAuthen(`user/change_pass_word`, 'POST', data);
            let status = res.status;
            if (status == 204) {
                dispatch(signOut('BAD_REQUEST'))
            }
            else{
                dispatch(Action.changePassword(status, res.data))
            }
                
        } catch (error) {
            throw error
        }
    }
}
