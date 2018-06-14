import * as ActionTypes from '../../contants/ActionTypes';

const _initialState = {
    success: false,
    errMessage: "",
    field: ""
}
const change_password = (state = _initialState, action) => {
    switch (action.type) {
        case ActionTypes.CHANGE_PASS_WORD:
            let { errMessage, field } = action.data;
            let status = action.status;
            if (status == 200) {
                return {
                    success: true,
                    errMessage: "",
                    field: ""
                }
            }
            else {
                return {
                    ...state,
                    errMessage: errMessage,
                    field: field
                }
            }
        default:
            return { ...state };
    }
}
export default change_password;