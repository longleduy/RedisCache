import {_CALL_API,_ACTION_ADD_TO_CARD,_ACTION_CHANGE_AMOUNTS,_ACTION_DELETE_CARD,_SAVE_CARD} from '../contants/ActionTypes';
import callApi from '../utils/apiCaller';
export  const addToCard = (product) => {
    return{
        type: _ACTION_ADD_TO_CARD,
        product
    }
}
export  const changeAmounts = (change_action,id) => {
    return{
        type: _ACTION_CHANGE_AMOUNTS,
        change_action,
        id
    }
}
export  const deleteCard = (id) => {
    return{
        type: _ACTION_DELETE_CARD,
        id
    }
}
export const saveCard = (obj)=>{
    return{
        type: _SAVE_CARD,
        obj
    }
}
export const actFetchDataApiReques = () => {
    return (dispatch) => {
        return callApi('items', 'GET', null)
            .then(res => {
                actFetchDataApiRedux(res.data);
            })
    }
}

export const actFetchDataApiRedux = (obj) => {
    return {
        type: _CALL_API,
        obj
    }
}