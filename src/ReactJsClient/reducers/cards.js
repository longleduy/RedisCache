import { _ACTION_ADD_TO_CARD, _ACTION_CHANGE_AMOUNTS, _ACTION_DELETE_CARD } from '../contants/ActionTypes';
var listSession = JSON.parse(localStorage.getItem('_cardState'));
var _cardState = listSession ? listSession :[];
const cards = (state = _cardState, action) => {
    switch (action.type) {
        case _ACTION_ADD_TO_CARD:
            let newState;
            let idx = state.findIndex((product) => {
                return product.id == action.product.id;
            })
            if (idx == -1) {
                newState = [{ ...action.product, amounts: 1}, ...state];
            }
            else {
                newState = [...state, ...state[idx].amounts++];
            }
            localStorage.setItem('_cardState', JSON.stringify(newState));
            return newState;
        case _ACTION_CHANGE_AMOUNTS:
            let idx_change_amounts = state.findIndex((product) => {
                return product.id == action.id;
            })
            let newState2;
            if (action.change_action === "Up") {
                newState2 = [...state, ...state[idx_change_amounts].amounts++];
            }
            else {
                newState2 = [...state, ...state[idx_change_amounts].amounts--];
            }
            localStorage.setItem('_cardState', JSON.stringify(newState2));
            return newState2;
        case _ACTION_DELETE_CARD:
            let idx_delete_card = state.findIndex((product) => {
                return product.id == action.id;
            })
            let newState3 = [...state];
            newState3.splice(idx_delete_card,1);
            localStorage.setItem('_cardState',JSON.stringify(newState3));
            return newState3;
        default:
            return [...state]
    }
}
export default cards;
