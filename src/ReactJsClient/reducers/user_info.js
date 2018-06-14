import * as ActionTypes from '../contants/ActionTypes';

const _initialState = {
    isAuthen: false,
    user_name: "",
    level: "",
    email:"",
    provider:"",
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
                email: action.data.email,
                provider: action.data.provider
            };
        case ActionTypes.SIGN_OUT:
            return {
                ...state,
                isAuthen: false,
                user_name: "",
                level: "",
                email: "",
                provider: "",
                status: action.status
            }
        default:
            return { ...state };
    }
}
export default user_info;