
//TODO: Set Item to LocalStorage
export const setItemLocalStorage = (your_key, your_value) => {
    return localStorage.setItem(your_key, your_value);
}

//TODO: Get Item from LocalStorage
export const getItemLocalStorage = (your_key) => {
    return localStorage.getItem(your_key);
}

//TODO: Remove Item from LocalStorage
export const removeItemLocalStorge = (your_key) => {
    return localStorage.removeItem(your_key);
}
