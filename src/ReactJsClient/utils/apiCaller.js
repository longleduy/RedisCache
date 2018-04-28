import axios from 'axios';
import { _API_URL,_API_NODEJS } from '../contants/ApiConfig';

export const callApi = (endpoint, method = 'GET', body) => {
    return axios({
        method: method,
        url: `${_API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err)
    })
}