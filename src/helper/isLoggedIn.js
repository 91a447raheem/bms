// import request from '../serverCalls/server'
import cons from './Consts'
//import Cookies from 'universal-cookie'
import {reactLocalStorage} from 'reactjs-localstorage';
import jwtDecode from 'jwt-decode';

//const ck = new Cookies();
const isLoggedIn = () => {
    var data = reactLocalStorage.get(cons.UDATA);
    console.log(data);
    if (data === null || data === undefined) {
        return false
    } else {
        return (data.toString().length > 0) ? true : false
    }
};
export const isUserAuthenticated = () => {
    var user =reactLocalStorage.get(cons.UDATA)
    console.log("user",user);

    if (!user) {
        return false;
    }else {
        user=JSON.parse(user)
    }

    const decoded = jwtDecode(user.token);
    console.log("decoded",decoded);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        console.warn('access token expired');
        return false;
    } else {
        return true;
    }
};


export default isLoggedIn