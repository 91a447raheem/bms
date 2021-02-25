
import cons, {serverConfig, serverApi, getTenantId} from '../helper/Consts';
import {post} from 'axios';
import {getCookie, removeCookies} from "../helper/Cookies";

export function requestList(url, data, callback,IsCompanyId) {
    console.log("request--->" + JSON.stringify(data));
    console.log(url);
    var headers={
        Accept: "application/json",
        Authorization: getCookie(cons.TOKEN_DATA) ,
        // "Access-Control-Allow-Origin": "localhost:3000",
        "Content-Type": "application/json"
    };
    fetch(url, {
        method: "POST",
        headers:headers ,
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(json => {
            console.log("resp " + JSON.stringify(json));
            if(json.error==='unauthorized'||json.error==='invalid_token'){
                //  removeCookies();
                //  window.location.reload();
            }
            callback(json);
        })
        .catch(error => {
            console.log(error);
        });
}
  export function getDashboardDetails(data,callback){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query:"query getDashboard($siteId: ID, $serialNo: ID, $auth: String!){\n" +
            "  getDashboard(siteId: $siteId, serialNo: $serialNo, auth: $auth){\n" +
            "    info{\n" +
            "      head\n" +
            "      value\n" +
            "    }\n" +
            "    title\n" +
            "    summary\n" +
            "    subtitle\n" +
            "    iconUrl\n" +
            "    iconName\n" +
            "    footer\n" +
            "    summary\n" +
            "    data{\n" +
            "      id\n" +
            "      title\n" +
            "      subtitle\n" +
            "      iconUrl\n" +
            "      iconName\n" +
            "      value\n" +
            "      condition\n" +
            "      status\n" +
            "    }\n" +
            "  }\n" +
            "}",
        variables:data
    })
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };
    console.log("reaquest data",data);

    fetch("https://api.vajraiot.com/graphql", requestOptions)
        .then(response => response.text())
        .then(result =>{
            callback(JSON.parse(result));
            console.log("response",result)
        } )
        .catch(error => console.log('error', error));


}
export function getDataFromUrl(url, callback) {
    console.log("url ", url);var headers= {
    };

    if( getCookie(cons.TOKEN_DATA))
     headers= {
        Authorization: getCookie(cons.TOKEN_DATA) ,
    };
    return fetch(url, {
        headers:headers
    })
        .then(response => response.json())
        .then(responseJson => {
            console.log("Success:", JSON.stringify(responseJson));
            if(responseJson.error==='unauthorized'||responseJson.error==='invalid_token'){
                removeCookies();
                window.location.reload();
            }
            if (responseJson.status !== 400) callback(responseJson);
        })
        .catch(error => {
            console.error(error);
        });
}
export function getNotifications(callback){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query:"query getNotifications{\n" +
            "  getNotifications{\n" +
            "    title\n" +
            "    createdAt\n" +
            "  }\n" +
            "}",
        variables:{}
    })
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };

    fetch("https://api.vajraiot.com/graphql", requestOptions)
        .then(response => response.text())
        .then(result =>{
            callback(JSON.parse(result));
            console.log(result)
        } )
        .catch(error => console.log('error', error));


}


