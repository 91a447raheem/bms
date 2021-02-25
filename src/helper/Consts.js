import {getCookie} from "./Cookies";


export const cons = {
    AUTH: "auth",
    TOKEN_DATA: "tokenData",
    UDATA: "uData",
    CELL_DATA:"cellData",
    SITES_DATA:"sitesData",
    DEVICES_DATA:"devicesData",
    SELECTED_SITE:"selectedSite",
    SELECTED_DEVICE:"selectedDevice"

};




export const serverConfig = {
    // SERVER_URL: (process.env.NODE_ENV === 'development') ? "http://erp.itis.com.sa:8080/" : "http://3.6.84.73:8080/",//put
    SERVER_URL: (process.env.NODE_ENV === 'development') ? "https://vajraapi.gnblabs.com/" : "https://vajraapi.gnblabs.com/"//put dev
    //   SERVER_URL: (process.env.NODE_ENV === 'development') ? "http://portal.vowjute.com:8080/" :  "http://"+window.location.hostname+":8080/",//putlive
};



export const serverApi = {
    LOGIN: serverConfig.SERVER_URL + 'iotadmin/auth/signin',
    DASHBOARD:serverConfig.SERVER_URL+'graphql',
    GET_SITES:serverConfig.SERVER_URL+'iotadmin/user/getSites',
    GET_DEVICES_BY_SITE_ID:serverConfig.SERVER_URL+'iotadmin/solution/getSolDevice?siteId=',
   // GET_SINGLE_SITE_DATA:serverConfig.SERVER_URL+'reports/getsinglesitedashboard/1/1',
    GET_SINGLE_SITE_DATA:serverConfig.SERVER_URL+'reports/singlesitedashboard/',
    GET_ALL_SITE_DATA:serverConfig.SERVER_URL+'reports/getAllsitedashboard/',
    GET_STATASTICS:serverConfig.SERVER_URL+'reports/getStatistics',
    FORGOT_PASSWORD:serverConfig.SERVER_URL+'iotadmin/user/forgotPassword/'
};

export default cons;