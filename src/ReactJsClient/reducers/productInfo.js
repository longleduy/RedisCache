import { _GET_INFO_PRODUCT } from '../contants/ActionTypes';
const _initialState = {};
const productInfo = (state = _initialState, action) => {
    switch (action.type) {
        case _GET_INFO_PRODUCT:
            state = action.obj;
            return {...state};
        default:
            return {...state};
    }
}
export default productInfo;

