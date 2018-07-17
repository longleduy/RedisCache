import { push } from 'react-router-redux'
import * as ActionTypes from '../contants/ActionTypes';
import * as CallAPI from '../utils/api_caller';
import * as Action from './action'
import * as AuthenCommon from '../utils/auth_common'
import * as Common from '../utils/common'
import jwt from 'jsonwebtoken'
//Todo: Auth request

export const callAuthenAPI = (endPoint, method = 'GET', data, reqType) => {
    return async (dispatch) => {
        try {
            let res = await CallAPI.callApiAuthen(endPoint, method, data);
            changeAuthRequest(reqType, dispatch, res)
            if (res.status == 204) {
                badRequest(dispatch)
            }
            if(res.status == 203){
                errPage(dispatch)
            }
        } catch (error) {
            errPage(dispatch)
            throw error
            
        }
    }
}
export const changeAuthRequest = (reqType, dispatch, res) => {
    if (reqType == 'DEL_REQUEST') {
        if (res.status == 200) {
            dispatch(Action.delRequest())
        }
    }
    if (reqType == 'CHANGE_PASSWORD') {
        if (res.status == 200 || res.status == 202) {
            dispatch(Action.changePassword(res.status, res.data))
        }
    }
    if (reqType == 'UPLOAD_AVATAR') {
        if (res.status == 200 || res.status == 202) {
            AuthenCommon.setToken(res.data.userInfo.token);
            let {avatar} = res.data.userInfo
            if(typeof avatar != 'undefined'){
                Common.setItemLocalStorage('avatar', avatar);
            }
            let infoUser = {
                payload: jwt.decode(res.data.userInfo.token),
                avatar: res.data.userInfo.avatar
            }
            dispatch(Action.updateInfor(infoUser))
        }
    }
    

}
export const badRequest = (dispatch) => {
    dispatch(signOut('BAD_REQUEST'))
}
export const errPage = (dispatch) => {
    dispatch(push('/support'))
}
//Todo: Normal request

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


