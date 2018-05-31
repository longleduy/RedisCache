import * as ActionTypes from '../contants/ActionTypes';
import * as CallAPI from '../utils/api_caller';
import * as Action from './action'
import * as AuthenCommon from '../utils/auth_common'
export const callAuthenAPI = (endPoint, method = 'GET', data) => {
    return async (dispatch) => {
        try {
            let res = await CallAPI.callApiAuthen(endPoint, method, data)
            if (res.status == 202) {
               dispatch(Action.signOut('BAD_REQUEST'));
            }
        } catch (error) {
            throw error
        }
    }
}
