import axios from 'axios';
import { _API_URL, _API_NODEJS } from '../contants/ApiConfig';
import * as Authentication from './auth_common'
axios.defaults.withCredentials = true;
export const callApi = (endpoint, method = 'GET', body) => {
    return axios({
        method: method,
        url: `${_API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err)
    })
}
export const getApi = (endpoint, params) => {
    return axios.get(`${_API_URL}/${endpoint}`, {
        params: params,
    })
        .catch(function (error) {
            console.log(error);
        });
}
export const callApiAuthen = (endpoint, method = 'GET', body) => {
    let token = Authentication.getToken();
    return axios({
        method: method,
        url: `${_API_URL}/${endpoint}`,
        data: body,
        headers: {
            'Authorization': token == null ? "notAuthen":`Beare ${token}`
        }
    }).catch(err => {
        console.log(err)
    })
}