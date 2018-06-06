import {store} from '../index'
import * as Action from '../actions/action'
//Todo: Check if a user is authenticated - check if a token is saved in Local Storage
export const isUserAuthenticated = () => {
    return localStorage.getItem('token') !== null;
}

//Todo: Deauthenticate a user. Remove a token from Local Storage.
export const deAuthenticateUser = () => {
    return  localStorage.removeItem('token');
}

//Todo: Get token
export const getToken = () => {
    return  localStorage.getItem('token');
}
//Todo: Set a token to Local Storage.
export const setToken = (token) => {
    return localStorage.setItem('token',token)
}