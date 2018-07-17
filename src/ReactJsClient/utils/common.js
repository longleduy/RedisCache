
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

export const avatarBuffer = (imgBase64) => {
    let buf = Buffer.from(imgBase64, 'utf8');
    console.log(buf)
    return buf;
}
export const bufferToString = (buf) => {
    let str = buf.toString('utf8');
    return str;
}
