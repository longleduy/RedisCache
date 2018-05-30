//TODO: Check if a user is authenticated - check if a token is saved in Local Storage
export const isUserAuthenticated = () => {
    return localStorage.getItem('token') !== null;
}

//TODO: Deauthenticate a user. Remove a token from Local Storage.
export const deAuthenticateUser = () => {
    return  localStorage.removeItem('token');
}

//TODO: Get token
export const getToken = () => {
    return  localStorage.getItem('token');
}