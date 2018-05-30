import * as ActionTypes from '../contants/ActionTypes';
import {callApi, getApi} from '../utils/api_caller';
//TODO: Fetch data 
export const actFetchDataApiReques = () => {
    return (dispatch) => {
        return getApi('user/get_info', {email: localStorage.getItem('email'),demo:1})
            .then(res => {
                dispatch(actFetchDataApiRedux(res.data));
            })
    }
}
export const actFetchDataApiRedux = (data) => {
    return{
        type: ActionTypes.SIGN_IN_SUCCESS,
        data
    }
}
