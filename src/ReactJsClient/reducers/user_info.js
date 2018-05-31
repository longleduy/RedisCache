import * as ActionTypes from '../contants/ActionTypes';

const _initialState = {
    isAuthen: false,
    user_name: "",
    level: "",
    status: 'DEFAULT'
}
const user_info = (state = _initialState, action) => {
    switch (action.type) {
        case ActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                isAuthen: true,
                user_name: action.data.user_name,
                level: action.data.permisson,
            };
        case ActionTypes.SIGN_OUT:
            return {
                ...state,
                isAuthen: false,
                user_name: "",
                level: "",
                status: action.status
            }
        default:
            return { ...state };
    }
}
export default user_info;