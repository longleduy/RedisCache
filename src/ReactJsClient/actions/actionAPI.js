import { _CALL_API,_DEL_CARD, _ADD_CARD, _GET_INFO_PRODUCT } from '../contants/ActionTypes';
import {callApi,callApiNodeJs} from '../utils/apiCaller';
//TODO: Fetch data 
export const actFetchDataApiReques = () => {
    return (dispatch) => {
        return callApiNodeJs('product/viewall', 'GET', null)
            .then(res => {
                dispatch(actFetchDataApiRedux(res.data));
            })
    }
}

export const actFetchDataApiRedux = (obj) => {
    return {
        type: _CALL_API,
        obj
    }
}

//TODO: Del Card
export const actDelCardReques = (id) => {
    return (dispatch) => {
        return callApi(`items/${id}`,'DELETE',null)
            .then(res => {
                dispatch(actDelCardRedux(id));
            })
    }
}
export const actDelCardRedux= (id) => {
    return {
        type: _DEL_CARD,
        id
    }
}

//TODO: Add Card
export const actAddCardReques = (product, history) => {
    return (dispatch) => {
        return callApi('items','POST',product)
            .then(res => {
                dispatch(actAddCardRedux(res.data));
                history.goBack();
            })
    }
}
export const actAddCardRedux = (obj) => {
    return {
        type: _ADD_CARD,
        obj
    }
}

//TODO: Get product info
export const actGetProductInfoReques = (id) => {
    return (dispatch) => {
        return callApi(`items/${id}`,'GET',null)
            .then(res=>{
                dispatch(actGetProductInfoRedux(res.data));
            })
    }
}
export const actGetProductInfoRedux = (obj) => {
    return {
        type: _GET_INFO_PRODUCT,
        obj
    }
}
