import * as ActionTypes from '../contants/ActionTypes';

const _initialState = {
    isAuthen: false,
    user_name: "",
    level: "",
    email:"",
    provider:"",
    avatar:"",
    status: 'DEFAULT'
}
const user_info = (state = _initialState, action) => {
    switch (action.type) {
        case ActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                isAuthen: true,
                user_name: action.data.payload.user_name,
                level: action.data.payload.permisson,
                email: action.data.payload.email,
                provider: action.data.payload.provider,
                avatar:typeof action.data.avatar != 'undefined' ? action.data.avatar : state.avatar
            };
            console.log(state)
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