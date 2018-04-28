import { _DEL_CARD, _CALL_API, _ADD_CARD } from '../contants/ActionTypes';
const _initialState = [];
const products = (state = _initialState, action) => {
    switch (action.type) {
        case _CALL_API:
            state = action.obj;
            return [...state];
        case _DEL_CARD:
            let _index = state.findIndex((product) => {
                return product.id == action.id
            });
            state.splice(_index, 1);
            return [...state];
        case _ADD_CARD:
            state.push(action.obj);
            return [...state];
        default:
            return [...state];
    }
}
export default products;