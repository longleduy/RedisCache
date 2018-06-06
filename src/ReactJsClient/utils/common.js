
//Todo: Set Item to LocalStorage
export const setItemLocalStorage = (your_key, your_value) => {
    return localStorage.setItem(your_key, your_value);
}

//Todo: Get Item from LocalStorage
export const getItemLocalStorage = (your_key) => {
    return localStorage.getItem(your_key);
}

//Todo: Remove Item from LocalStorage
export const removeItemLocalStorge = (your_key) => {
    return localStorage.removeItem(your_key);
}
