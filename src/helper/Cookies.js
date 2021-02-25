
import cons from './Consts';
import isLogin from './isLoggedIn';
import {reactLocalStorage} from 'reactjs-localstorage';


export const getCookie = (key) => {
    return reactLocalStorage.get(key);
};

export const setCookie = (key, value) => {
    reactLocalStorage.set(key, value);
};
export const setCookieObj = (key, value) => {
    reactLocalStorage.setObject(key, value);
};
export const removeCookie = (key) => {
    reactLocalStorage.remove(key);
};
export const removeCookies = () => {
    reactLocalStorage.remove(cons.UDATA);
    reactLocalStorage.remove(cons.TOKEN_DATA);
    reactLocalStorage.remove(cons.SITES_DATA);
    reactLocalStorage.remove(cons.DEVICES_DATA);
    reactLocalStorage.remove(cons.SELECTED_DEVICE);
    reactLocalStorage.remove(cons.SITES_DATA);

    return true;
};






