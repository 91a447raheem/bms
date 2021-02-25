import React, {useState, useEffect} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps'
import moment from 'moment';
import {
    BatteryStatusIcon,
    CommunicationStatusIcon,
    statisticsIcon,
    technicalDetailsIcon,
    notificationBell,
    batteryCharging,

} from '../Assets'
import CellDataPopup from './CellDataPopup'
import CellStatsPopup from './CellStatsPopup'

import {Header, Footer, SliderBlock, Filters, TabsList} from './Common'
import {CellDataJson, CellStatsJson} from '../jsons'
import {getDashboardDetails, getDataFromUrl, getNotifications, requestList} from "../services/server";
import DayPickerInput from "react-day-picker/DayPickerInput";
import cons, {serverApi} from "../helper/Consts";
import ItemsCarousel from "react-items-carousel";
import {isUserAuthenticated} from "../helper/isLoggedIn";
import {getCookie, removeCookie, setCookie} from "../helper/Cookies";
import {Map, Marker} from "google-maps-react";
import MapContainer from "./MapContainer";
import NotificationsPopup from "./NotificationsPopup";
import {set} from "echarts/src/util/clazz";
import SitesDataPopup from "./SitesDataPopup";
import {
    dashboardBg, dashboard_bg
} from "../Assets";
import {ManufactureDetailPopup} from "./index";
import ReactEcharts from "./ReactECharts";
import { Chart } from "react-google-charts";

const Dashboard = (props) => {
    const [singleloading, setSingleLoading] = useState(false);

    const [cellData, setCellData] = useState(false);
    const [manufacturePopup, setmanufacturePopup] = useState(false);
    const [cellStats, setCellStats] = useState(false);
    const [notifStats, setNotifStats] = useState(false);
    const [sitesPopup, setSitesPopup] = useState(false);
    const [sitesPopupText, setSitesPopupText] = useState("");
    const [isSite, setIsSite] = useState(false);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [sitesData, setSitesData] = useState([]);
    const [sitesId, setSitesId] = useState(null);
    const [device, setDevice] = useState(null);
    const [deviceData, setDeviceData] = useState([]);
    const [info, setInfo] = useState([]);
    const [dashboardData, setDashboardData] = useState([]);
    const [statasticsData, setStatasticsData] = useState([]);
    const [cellsData, setcellsData] = useState([]);
    const [selectedCell, setSelectedCell] = useState(null);

    const [activeItemIndex, changeActiveItem] = useState(2);
    const [locations, setLocations] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [lastPacketReceivedTime, setlastPacketReceivedTime] = useState("");
    const [iconsData, setIconsData] = useState(null);
    var userId = JSON.parse(getCookie(cons.UDATA));
    userId = userId.id;
    const handleClickonData = () => {
        // Once after service call we need to fetch the stop the loader
        setLoading(false);
        setCellStats(true)
        //  setData(CellDataJson);
        // setCellData(!cellData)
        // var data=dashboardData[activeItemIndex].data?JSON.stringify(dashboardData[activeItemIndex].data):null;
        /*   setCookie(cons.CELL_DATA, JSON.stringify(statasticsData));
           setCookie(cons.DEVICES_DATA, JSON.stringify(deviceData));
           setCookie(cons.SITES_DATA, JSON.stringify(sitesData));
           setCookie(cons.SELECTED_SITE, JSON.stringify(sitesId));
           setCookie(cons.SELECTED_DEVICE, JSON.stringify(device));
           props.history.push("/statastics")*/

    };
    const handleClickonCellData = () => {
        // Once after service call we need to fetch the stop the loader
        setLoading(false);
        setCellData(!cellData)


    };


    const handleClickonStats = () => {
        // Once after service call we need to fetch the stop the loader
        setLoading(false);
        // setmanufacturePopup(!manufacturePopup)
        setCellStats(!cellStats)
    };
    const handleClickonManufacture = () => {
        // Once after service call we need to fetch the stop the loader
        setLoading(false);
        setmanufacturePopup(!manufacturePopup)
        // setCellStats(!cellStats)
    };
    const handleClickonnotifications = () => {
        // Once after service call we need to fetch the stop the loader
        setLoading(false);
        setNotifStats(!notifStats)
    };
    const onClickSiteOnMap = (id) => {
        //  getDataFromUrl(serverApi.GET_SINGLE_SITE_DATA, handleSiteDashboard);

        getDataFromUrl(serverApi.GET_DEVICES_BY_SITE_ID + id, handleDeviceData);
        sitesData.forEach(prop => {
            if (prop.name === id) {
                setSitesId(prop);
            }
        });
    };
    const handleClickSitesPopup = (id) => {
        // Once after service call we need to fetch the stop the loader
        setLoading(false);
        setSitesPopup(!sitesPopup);
        if (id !== null) {
            //  getDataFromUrl(serverApi.GET_SINGLE_SITE_DATA+id+device.id, handleSiteDashboard);
            setSitesId(id);

            getDataFromUrl(serverApi.GET_DEVICES_BY_SITE_ID + id.id, handleDeviceData);
            /*
                        getDashboardDetails({
                            "siteId": id.id,
                            "auth":getCookie(cons.TOKEN_DATA)
                        },handleDashboard);
            */

        } else {
            setSitesId(null)
        }


    };
    useEffect(() => {
        if (sitesData.length === 0)
            getDataFromUrl(serverApi.GET_SITES, handleSites);
        if (notifications.length === 0)
            getNotifications(handleNotifications);
        if (sitesId === null && dashboardData.length === 0) {
            /*  getDashboardDetails({
                  "auth": getCookie(cons.TOKEN_DATA)
              }, handleDashboard)*/
            getDataFromUrl(serverApi.GET_ALL_SITE_DATA + userId, handleDashboard);

        } else {
            if (sitesId !== null && device !== null)
                getDataFromUrl(serverApi.GET_SINGLE_SITE_DATA + sitesId.id + "/" + device.serialNo, handleSiteDashboard);

            /*   getDataFromUrl(serverApi.GET_DEVICES_BY_SITE_ID + sitesId.id, handleDeviceData);
               getDataFromUrl(serverApi.GET_SINGLE_SITE_DATA, handleSiteDashboard);
               removeCookie(cons.SELECTED_SITE);
               removeCookie(cons.SELECTED_DEVICE);*/
        }

    }, []);
    useEffect(() => {
        if (sitesId !== null && device !== null && singleloading) {
            getDataFromUrl(serverApi.GET_SINGLE_SITE_DATA + sitesId.id + "/" + device.serialNo, handleSiteDashboard);
            setSingleLoading(false)
        }
    });

    const handleNotifications = (resp) => {
        console.log("notifs", resp);
        if (resp.data.getNotifications) {
            setNotifications(resp.data.getNotifications)
        }

    };
    const handleSites = (resp) => {
        var loc = [];
        console.log("sites", resp);
        setSitesData(resp);
        // setSitesId(resp[0]);
        // getDataFromUrl(serverApi.GET_DEVICES_BY_SITE_ID + 0, handleDeviceData);
        resp.forEach(prop => {

            loc.push({...prop.location, name: prop.name})
        });
        setLocations(loc);
    };
    const handleDashboard = (resp) => {
        console.log("sitesId", sitesId);

        //   if(resp.data.getDashboard){
        changeActiveItem(2)
        setDashboardData(resp.getDashboard);
        setInfo(resp.info)
        //  }
    };
    const handleSiteDashboard = (resp) => {
        console.log("dash", resp.data.getDashboard);
        console.log("dash2", resp.data2);
        setlastPacketReceivedTime(resp.lastPacketReceivedTime);
        setIconsData(resp.icons);

        // var resp=CellDataJson;

        setDashboardData(resp.data.getDashboard);
        changeActiveItem(2);


        // if(resp.data2){
        setStatasticsData(resp.data2)
        //}


    };

    const handleDeviceData = (resp) => {
        if (resp) {
            setDeviceData(resp);
            setDevice(resp[0]);
            setSingleLoading(true)
            /*  if(sitesId!==null)
             getDataFromUrl(serverApi.GET_SINGLE_SITE_DATA+sitesId.id+"/"+resp[0].serialNo, handleSiteDashboard);*/

            /*  getDashboardDetails({
                  "siteId":0,
                  "serialNo": 0,
                  "auth":getCookie(cons.TOKEN_DATA)
              },handleDashboard);*/

        }
    };

    const handleClick = (index) => {
        console.log("Clicked in Mid Slider", index);
        changeActiveItem(index);
        if (sitesId === null) {
            setSitesPopupText(dashboardData[index].title);
            setSitesPopup(true);
            setIsSite(false)

        }

    };
    const renderRedirectToRoot = () => {
      //  const isAuthTokenValid = isUserAuthenticated();

       // if (!isAuthTokenValid) {
            props.history.push("/")
       //}
    };


    var d = new Date();
    d.setHours(d.getHours() - 1);
    var color = "red";
    d = moment(d).format("DD-MM-YYYY HH:mm:ss");
    d = moment(d, 'DD-MM-YYYY HH:mm:ss');
    if (lastPacketReceivedTime) {
        var lastPackDate = moment(lastPacketReceivedTime, 'DD-MM-YYYY HH:mm:ss').valueOf();
        if (lastPackDate >= d)
            color = "green";
    }
    console.log("color,,,,", color);
    const pieColor = [
        '#052440','#8b008b','#ff0000','#009354','#fcaf31','#8b0000'
    ];


    const pietheme = {
        color: pieColor,
        line: {
            smooth : true,
            symbol: 'emptyCircle',
          //  symbolSize: 5
        },
    };
   var options = {
/*        title: {
            text: 'BMS Status',
            subtext: '',
            left: 'center',
            textStyle:{
                lineHeight:80,
                marginBottom:"20px"
            }
        },*/

        tooltip: {
            trigger: 'item'
        },
       legend: {
           bottom: 10,
           left: 'center',
           data: ['西凉', '益州', '兖州', '荆州', '幽州']
       },
        series: [
            {
                name: 'Parameters',
                type: 'pie',
                radius: '80%',
                data:dashboardData&&dashboardData.length>0?dashboardData.map(prop=>{
                    var val=prop.footer.split(" ");
                    return   {value: parseInt(val[0]), name: prop.title}
                }): [
                    {value: 1048, name: 'String Voltage'},
                    {value: 735, name: 'String Current'},
                    {value: 580, name: 'Battery Status'},
                    {value: 484, name: 'Ambient Teperature'},
                    {value: 300, name: 'State Of Charge'},
                    {value: 300, name: 'Site Communication'}

                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
   var chartData=[]
    chartData.push(   ['Parameter', 'value'])
    if(dashboardData)
       dashboardData.map(prop=>{
       var val=prop.footer.split(" ");
       chartData.push(  [prop.title,parseInt(val[0])])
   });
    return (
        <div>
            <div className="mainBlock">
{/*
                {renderRedirectToRoot()}
*/}
                <Header notifications={notifications} redirect={renderRedirectToRoot}/>
                <div className="fliterOptions">
                    <div className="container-fluid">
                        <ul>
                            <li style={{
                                width: "16.4%",
                                textAlign: "center",
                                height: "40px"
                            }}>
                                {/*
                            <div >Select Site<i className="fa fa-filter" aria-hidden="true" /></div>
*/}
                                <select className="siteOptions" placeholder={"Select Site"}
                                        value={sitesId !== null ? sitesId.name : "All Sites"} onChange={(event) => {
                                    console.log("select", event.target.value);
                                    if ("All Sites" === event.target.value) {
                                        setSitesId(null);
                                        setDeviceData([]);
                                        setDevice(null);
                                        setDashboardData([]);
                                        getDataFromUrl(serverApi.GET_ALL_SITE_DATA + userId, handleDashboard);
                                        /*   getDashboardDetails({
                                               "auth": getCookie(cons.TOKEN_DATA)
                                           }, handleDashboard);*/

                                    } else
                                        sitesData.forEach(o => {
                                            if (o.name + "" === event.target.value) {
                                                setSitesId(o);
                                                setDevice(null);
                                                setDeviceData([])


                                                getDataFromUrl(serverApi.GET_DEVICES_BY_SITE_ID + o.id, handleDeviceData);
                                                /* getDashboardDetails({
                                                     "siteId": o.id,
                                                     "auth":getCookie(cons.TOKEN_DATA)
                                                 },handleDashboard);*/


                                            }
                                        });
                                }}>
                                    <option>All Sites</option>
                                    {sitesData.length > 0 ? sitesData.map(prop => {
                                        return (<option>{prop.name}</option>)
                                    }) : null}
                                </select>
                            </li>
                            <li style={{
                                width: "16.4%",
                                textAlign: "center",
                                height: "40px"
                            }}>
                                {/* <div >Select Device</div>*/}

                                <select placeholder={"Select Device"}  className="siteOptions"
                                        value={device !== null ? device.serialNo : "All Devices"} onChange={(event) => {
                                    deviceData.forEach(o => {
                                        if (o.serialNo + "" === event.target.value) {
                                            // getDataFromUrl(serverApi.GET_SINGLE_SITE_DATA+sitesId.id+"/"+o.id, handleSiteDashboard);
                                            /*
                                                                                    getDashboardDetails({
                                                                                        "siteId": sitesId.id,
                                                                                        "serialNo": o.id,
                                                                                        "auth":getCookie(cons.TOKEN_DATA)
                                                                                    },handleDashboard);
                                            */
                                            setSingleLoading(true);
                                            setDevice(o)
                                        }
                                    });
                                }}>
                                    <option>All Devices</option>
                                    {deviceData.length > 0 ? deviceData.map(prop => {
                                        return (<option>{prop.serialNo}</option>)
                                    }) : null}

                                </select>
                            </li>
                            {sitesId === null && info && info.length > 0 ?
                                info.map((prop, i) => {
                                    var color = "#052440", width = "15.4%",margin="15px";
                                    if (i === 1)
                                        color = "red";
                                    else if (i === 2)
                                        color = "#009354";
                                    else if (i === 3) {
                                        color = "#fcaf31";
                                        width = "16.2%"
                                        margin="0px"
                                    }

                                    return (
                                        <li style={{
                                            width: width,
                                            backgroundColor: color,
                                            marginRight:margin,
                                            border: "1px solid #ececec",
                                            borderRadius: "5px",
                                            textAlign: "center",
                                            height: "40px"
                                        }}>
                                            <div className="block" onClick={() => {
                                                if (sitesId === null) {
                                                    setSitesPopupText(prop.head);
                                                    setSitesPopup(true);
                                                    setIsSite(true)
                                                }
                                            }}>
                                                <div style={{color: "#FFFFFF", marginTop: "5px"}}>{prop.value}
                                                    <span>{prop.head}</span></div>
                                                {/*
                                                <div className="numberRightBlock">
                                                    <div className="title_filter" style={{ color: "#FFFFFF" }}>{prop.head}</div>

                                                </div>
*/}
                                            </div>
                                        </li>

                                    )
                                }) : null
                            }

                            {/*
                        <li>
                            <div className="date"><DayPickerInput /> <div className="calendarIcon"><i className="fa fa-calendar" aria-hidden="true" /></div></div>
                        </li>
*/}
                        </ul>
                        {sitesId !== null ? <div className="lastPacket" style={{color: color}}>Last Packet Received Time
                            : {lastPacketReceivedTime}</div> : null}
                    </div>
                </div>

                {/*
                {sitesId === null ? <div className="countBlock">
                    <div className="container-fluid">
                        <ul>
                            <li>
                                <div className="block">
                                    <div className="locationname">{sitesId !== null ? sitesId.name : "All Sites"}</div>
                                    <div className="siteStatus">{device !== null ? device.serialNo : "All Devices"}</div>
                                </div>
                            </li>
                            {info && info.length > 0?
                               info.map((prop, i) => {
                                    var color = "#052440";
                                    if (i === 1)
                                        color = "red";
                                    else if (i === 2)
                                        color = "#009354";
                                    else if (i === 3)
                                        color = "#fcaf31";
                                    return (
                                        <li>
                                            <div className="block" onClick={() => {
                                                if (sitesId === null) {
                                                    setSitesPopup(true);
                                                    setSitesPopupText(prop.head);
                                                }
                                            }}>
                                                <div className="number" style={{ color: color }}>{prop.value}</div>
                                                <div className="numberRightBlock">
                                                    <div className="title_filter" style={{ color: color }}>{prop.head}</div>

                                                </div>
                                            </div>
                                        </li>

                                    )
                                }) : null
                            }
                            <li>
                            </li>
                        </ul>
                    </div>
                </div> : null}
*/}
                <div className="dashboardBg">

                    <div className="sliderBlock">
                        <div className="container-fluid sliderInr">
                            <ItemsCarousel
                                // Placeholder configurations
                                enablePlaceholder
                                // Carousel configurations
                                numberOfCards={5}
                                gutter={14}
                                showSlither={true}
                                firstAndLastGutter={true}
                                freeScrolling={true}

                                // Active item configurations
                                requestToChangeActive={changeActiveItem}
                                activeItemIndex={activeItemIndex}
                                activePosition={'center'}
                                // infiniteLoop={true}
                                chevronWidth={24}
                                rightChevron={dashboardData.length > 5 ?
                                    <span class="material-icons">navigate_next</span> : null}
                                leftChevron={dashboardData.length > 5 ?
                                    <span class="material-icons">navigate_before</span> : null}
                                outsideChevron={true}
                                alwaysShowChevrons={true}
                                slidesToScroll={1}
                            >
                                {dashboardData.map((item, index) => {
                                    return (
                                        <div className="SingleSlide">
                                            <div className={activeItemIndex == index ? "block activeSlide" : "block"}
                                                 onClick={() => handleClick(index)}>
                                                <div className="title">{item.title}</div>
                                                <div><img src={item.iconUrl}/></div>
                                                <div className="subtitle">{item.footer}</div>
                                            </div>
                                        </div>)
                                })}
                            </ItemsCarousel>
                        </div>
                    </div>
                </div>
                <div className="footerTopBlock">
                    <div className="container-fluid">

                        {sitesId === null ? <div className="mapBlock block">
                            {/*
                        <div className="title">Google Map</div>
*/}
                            {/*
                        <div className="subtitle">Select sites from satellite location</div>
*/}
                            <div className="map">
                                <MapContainer locations={locations} initialLocation={sitesId !== null ? {
                                    ...sitesId.location,
                                    name: sitesId.name
                                } : sitesData.length > 0 ? sitesData[0].location : null}
                                              onClickSite={onClickSiteOnMap}/>


                                {/*
                            <MapComponent
                                googleMapURL="AIzaSyCbD0EhUrE45uSOYt_SrfiWxkdadqrwLxU"
                                loadingElement={<div style={{ height: '100%' }} />}
                                containerElement={<div style={{ height: '100vh', width: '100vh' }} />}
                                mapElement={<div style={{ height: '100%' }} />}
                            />
*/}

                                {/*
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30449.877599012394!2d78.37413608232063!3d17.448477225725714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bbe7be7792411b!2sMadhapur%2C%20Telangana!5e0!3m2!1sen!2sin!4v1609581397700!5m2!1sen!2sin" width={387} height={250} frameBorder={0} style={{ border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} />
*/}
                            </div>

                            <div    style={{float:"right",width:"48%", border: '1px solid #dfdfdf',height:"260px",
                                borderRadius: '4px',marginTop:"10px",marginLeft:"20px"}}>
                               <div className="title">BMS Status</div>
                                {dashboardData&&dashboardData.length>0  ? <Chart
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={chartData}
                                    options={{
                                        width:700,
                                        height:300,
                                       // title: 'My Daily Activities',
                                        // Just add this option
                                        is3D: true,
                                        pieSliceText: 'value'
                                    }}
                                    rootProps={{ 'data-testid': '1' }}
                                />:null}
{/*
                                <ReactEcharts option={options}
                                              theme={pietheme}
                                              showLoading={false}/>
*/}
                            </div>
                        </div> : null}
                        {sitesId !== null && dashboardData.length > 0 ? <div className="cellDataBlock block">
                            <div
                                className="title">{dashboardData[activeItemIndex] ? dashboardData[activeItemIndex].title : ""}</div>
                            <div className="subtitle">Summary of all information</div>

                            <div className="tabbed-area" style={{
                                height: 270,
                                backgroundColor: dashboardData[activeItemIndex].title === "String Info" ? "#ececec" : "#FFFFFF"
                            }}>
                                {dashboardData[activeItemIndex].title === "String Info" ?
                                    <div>
                                        <div style={{
                                            width: "49%",
                                            float: "left",
                                            height: "150px",
                                            margin: "5px",
                                            backgroundColor: "#FFFFFF"
                                        }}>
                                            <div color="#052440" style={{
                                                width: "100%",
                                                fontSize: "14px",
                                                overflow: "hidden",
                                                paddingLeft: "5px",
                                                fontWeight: "bold",
                                                backgroundColor: "#052440",
                                                color: "#FFF"
                                            }}>Instantaneous
                                            </div>
                                            {dashboardData[activeItemIndex].data && dashboardData[activeItemIndex].data.map(o => {
                                                if (o.title === "String Voltage" || o.title === "Current" || o.title === "State Of Charge(SOC)" || o.title === "Depth Of Discharge(DOD)" || o.title === "Ambient Temperature" || o.title === "Hourly Avg Temp" || o.title === "Cumulative Avg Temp")
                                                    return <div>
                                                        <div style={{
                                                            width: "50%",
                                                            fontSize: "12px",
                                                            overflow: "hidden",
                                                            float: "left",
                                                            color: "#000",
                                                            paddingLeft: "5px"
                                                        }}>{o.title}</div>
                                                        <div style={{
                                                            width: "50%",
                                                            fontSize: "12px",
                                                            overflow: "hidden",
                                                            fontWeight: "bold",
                                                            float: "right",
                                                            color: "#000"
                                                        }}>: {o.value}</div>

                                                    </div>
                                            })
                                            }
                                        </div>
                                        <div style={{
                                            width: "48%",
                                            float: "right",
                                            height: "150px",
                                            margin: "5px",
                                            backgroundColor: "#FFFFFF"
                                        }}>
                                            <div color="#052440" style={{
                                                width: "100%",
                                                fontSize: "14px",
                                                overflow: "hidden",
                                                paddingLeft: "5px",
                                                fontWeight: "bold",
                                                backgroundColor: "#052440",
                                                color: "#FFF"
                                            }}>Cummulative
                                            </div>
                                            {dashboardData[activeItemIndex].data && dashboardData[activeItemIndex].data.map(o => {
                                                if (o.title === "Charge-Discharge Cycles" || o.title === "Ampere HourIn" || o.title === "Ampere HourOut" || o.title === "Charging Energy" || o.title === "Discharging Energy" || o.title === "Battery Run Hours")
                                                    return <div>
                                                        <div style={{
                                                            width: "50%",
                                                            fontSize: "12px",
                                                            overflow: "hidden",
                                                            float: "left",
                                                            paddingLeft: "5px"
                                                        }}>{o.title}</div>
                                                        <div style={{
                                                            width: "50%",
                                                            fontSize: "12px",
                                                            overflow: "hidden",
                                                            fontWeight: "bold",
                                                            float: "right"
                                                        }}>: {o.value}</div>

                                                    </div>
                                            })
                                            }
                                        </div>
                                        <div style={{
                                            width: "49%",
                                            float: "left",
                                            height: "100px",
                                            margin: "5px",
                                            backgroundColor: "#FFFFFF"
                                        }}>
                                            <div style={{
                                                width: "100%",
                                                fontSize: "14px",
                                                overflow: "hidden",
                                                paddingLeft: "5px",
                                                fontWeight: "bold",
                                                backgroundColor: "#052440",
                                                color: "#FFF"
                                            }}>Charge-Cycle-Wise
                                            </div>
                                            {dashboardData[activeItemIndex].data && dashboardData[activeItemIndex].data.map(o => {
                                                if (o.title === "Peak Charge Current" || o.title === "Average Charge Current" || o.title === "Ampere HourIn " || o.title === "Charge Time")
                                                    return <div>
                                                        <div style={{
                                                            width: "50%",
                                                            fontSize: "12px",
                                                            overflow: "hidden",
                                                            float: "left",
                                                            paddingLeft: "5px"
                                                        }}>{o.title}</div>
                                                        <div style={{
                                                            width: "50%",
                                                            fontSize: "12px",
                                                            overflow: "hidden",
                                                            fontWeight: "bold",
                                                            float: "right"
                                                        }}>: {o.value}</div>

                                                    </div>
                                            })
                                            }
                                        </div>
                                        <div style={{
                                            width: "48%",
                                            float: "right",
                                            height: "100px",
                                            margin: "5px",
                                            backgroundColor: "#FFFFFF"
                                        }}>
                                            <div style={{
                                                width: "100%",
                                                fontSize: "14px",
                                                overflow: "hidden",
                                                paddingLeft: "5px",
                                                fontWeight: "bold",
                                                backgroundColor: "#052440",
                                                color: "#FFF"
                                            }}>Discharge-Cycle-Wise
                                            </div>
                                            {dashboardData[activeItemIndex].data && dashboardData[activeItemIndex].data.map(o => {
                                                if (o.title === "Peak Discharge Current" || o.title === "Average Discharge Current" || o.title === "Ampere HourOut " || o.title === "Discharge Time")
                                                    return <div>
                                                        <div style={{
                                                            width: "50%",
                                                            fontSize: "12px",
                                                            overflow: "hidden",
                                                            float: "left",
                                                            paddingLeft: "5px"
                                                        }}>{o.title}</div>
                                                        <div style={{
                                                            width: "50%",
                                                            fontSize: "12px",
                                                            overflow: "hidden",
                                                            fontWeight: "bold",
                                                            float: "right"
                                                        }}>: {o.value}</div>

                                                    </div>
                                            })
                                            }
                                        </div>


                                    </div> : null
                                }
                                {dashboardData[activeItemIndex].title === "Manufacturer Details" ?
                                    <div>
                                        <div style={{
                                            width: "100%",
                                            paddingLeft: "10px",
                                            float: "left",
                                            borderRight: "1px solid #dfdfdf"
                                        }}>
                                            {dashboardData[activeItemIndex].data && dashboardData[activeItemIndex].data.map(o => {
                                                return <div>
                                                    <div style={{
                                                        width: "50%",
                                                        fontSize: "18px",
                                                        overflow: "hidden",
                                                        float: "left"
                                                    }}>{o.title}</div>
                                                    <div style={{
                                                        width: "50%",
                                                        fontSize: "18px",
                                                        overflow: "hidden",
                                                        fontWeight: "bold",
                                                        float: "right"
                                                    }}>: {o.value}</div>

                                                </div>
                                            })
                                            }
                                        </div>


                                    </div> : null
                                }

                                {dashboardData[activeItemIndex].data && dashboardData[activeItemIndex].data.map((record, index) => {
                                    if (dashboardData[activeItemIndex].title !== "String Info" && dashboardData[activeItemIndex].title !== "Manufacturer Details")
                                        return <div className="betteryBlockAll" key={index} onClick={() => {
                                            if (dashboardData[activeItemIndex].title === "Cell Status" || dashboardData[activeItemIndex].title === "Cell Info" || dashboardData[activeItemIndex].title === "Battery Status") {
                                                setSelectedCell(record.title);
                                                if (record.title === "Total Cells") {
                                                    console.log("statasticsData", record.cellDetails);
                                                    setcellsData(statasticsData);
                                                    setCellData(true);
                                                } else if (dashboardData[activeItemIndex].title === "Battery Status") {
                                                    if (record.title === "Charging" || record.title === "Discharging") {
                                                        setcellsData(record.cellDetails);
                                                        setCellData(true);

                                                    }
                                                } else {
                                                    setcellsData(record.cellDetails);
                                                    setCellData(true);
                                                }

                                                /*
                                                                                                if (dashboardData[activeItemIndex].title === "Battery Status") {
                                                                                                    console.log("statasticsData", statasticsData);
                                                                                                    setcellsData(statasticsData);
                                                                                                    setCellData(true)
                                                                                                } else if (record.title === "Total Cells") {
                                                                                                    console.log("statasticsData", record.cellDetails);
                                                                                                    setcellsData(record.cellDetails);
                                                                                                    setCellData(true)
                                                                                                } else if (record.title === "Problem Cells") {
                                                                                                    var data = []
                                                                                                   /!* statasticsData.forEach(prop => {
                                                                                                        if (prop.CellStatus !== "Charging" && prop.CellStatus !== "Discharging") {
                                                                                                            data.push(prop)
                                                                                                        }
                                                                                                    });*!/
                                                                                                    setcellsData(record.cellDetails);
                                                                                                    setCellData(true)
                                                                                                } else if (record.title === "Communicating") {
                                                                                                   /!* var data = []
                                                                                                    statasticsData.forEach(prop => {
                                                                                                        if (prop.comStatus === "Communicating") {
                                                                                                            data.push(prop)
                                                                                                        }
                                                                                                    });*!/
                                                                                                    setcellsData(record.cellDetails);
                                                                                                    setCellData(true)
                                                                                                } else if (record.title === "Not Communicating") {
                                                                                                   /!* var data = []
                                                                                                    stata
                                                                                                    sticsData.forEach(prop => {
                                                                                                        if (prop.comStatus === "Not Communicating") {
                                                                                                            data.push(prop)
                                                                                                        }
                                                                                                    });*!/
                                                                                                    setcellsData(record.cellDetails);
                                                                                                    setCellData(true)
                                                                                                } else {
                                                                                                    var data = []
                                                                                                    statasticsData.forEach(prop => {
                                                                                                        console.log("tttt", record.title, prop.ComStatus);
                                                                                                        if (prop.cellStatus === record.title) {
                                                                                                            data.push(prop)
                                                                                                        }
                                                                                                    });
                                                                                                    setcellsData(data);
                                                                                                    setCellData(true)
                                                                                                }
                                                */
                                            }
                                        }}>

                                            <div style={{width: "100%"}}>
                                                <div className="betteryStatusImage"><img src={record.iconUrl}/></div>
                                                <div className="celldata_img_right">
                                                    <div className="cellcount">{record.value}</div>
                                                    <div>{record.title}</div>
                                                </div>
                                            </div>
                                            {/* <div style={{ width: "100%", fontSize: "16px", overflow: "hidden" }}></div> */}
                                            {/*
                                        {index===Index?<div style={tooltipStyle}>{record.title}<br/>{record.subtitle}</div>:null}
*/}
                                        </div>
                                })}
                            </div>

                            {/*
                        <TabsList icon={dashboardData.length>0?dashboardData[activeItemIndex].iconUrl:null} data={dashboardData.length>0?dashboardData[activeItemIndex]:""}/>
*/}
                        </div> : null}
                        {sitesId !== null ? <div className="staticBlock block">
                            <div className="title">Statistics</div>
                            <div className="subtitle">Average statistics of
                                the {sitesId !== null ? sitesId.name : ""} site
                            </div>
                            <div className="listBlock">
                                <div className="row">
                                    <div className="img"><img src={statisticsIcon}/></div>
                                    <div className="content">See all statistics & Graphs</div>
                                    <div className="viewMore" onClick={handleClickonData}>View All</div>
                                </div>
                                <div className="row">
                                    <div className="img"><img src={technicalDetailsIcon}/></div>
                                    <div className="content">See all technical<br/>and device details</div>

                                    <div className="viewMore" onClick={handleClickonManufacture}>View All</div>

                                </div>
                                <div className="row">
                                    <div className="img"><img src={notificationBell}/></div>
                                    <div className="content">See all notifications<br/> and others</div>

                                    <div className="viewMore" onClick={handleClickonnotifications}>View All</div>

                                </div>
                            </div>
                        </div> : null}
                    </div>
                </div>

            </div>
            <Footer/>
            {cellData ?
                <CellDataPopup dataResponse={cellsData ? cellsData : []} site={sitesId !== null ? sitesId.name : ""}
                               device={device !== null ? device.serialNo : ""} closePopup={handleClickonCellData}
                               loading={loading} selectedCell={selectedCell}
                               allCells={dashboardData[activeItemIndex] ? dashboardData[activeItemIndex].data : []}
                               iconsData={iconsData ? iconsData : null} lastPacketReceivedTime={lastPacketReceivedTime}
                               statasticsData={statasticsData ? statasticsData : []}/> : null}
            {cellStats ? <CellStatsPopup dataResponse={statasticsData ? statasticsData : []}
                                         site={sitesId !== null ? sitesId.name : ""}
                                         device={device !== null ? device : ""} siteId={sitesId} sitesData={sitesData}
                                         deviceData={deviceData} closePopup={handleClickonStats} loading={loading}
                                         dashboardData={dashboardData}
                                         cellsData={statasticsData ? statasticsData : []}/> : null}
            {notifStats ? <NotificationsPopup dataResponse={notifications.length > 0 ? notifications : []}
                                              closePopup={handleClickonnotifications} loading={loading}/> : null}
            {sitesPopup ?
                <SitesDataPopup data={sitesData.length > 0 ? sitesData : []} closePopup={handleClickSitesPopup}
                                loading={loading} name={sitesPopupText}
                                sites={dashboardData[activeItemIndex] ? dashboardData[activeItemIndex].data : []} isSite={isSite}/> : null}
            {manufacturePopup ? <ManufactureDetailPopup dataResponse={dashboardData.length > 0 ? dashboardData : []}
                                                        closePopup={handleClickonManufacture}
                                                        loading={loading}/> : null}

        </div>
    );
};

export default Dashboard;