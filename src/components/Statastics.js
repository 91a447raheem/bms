import React, {useState} from 'react';
import { Loader } from './Common'
import { temparatureIcon } from '../Assets';
import {getCookie, removeCookie} from "../helper/Cookies";
import cons, {serverApi} from "../helper/Consts";
import {getDashboardDetails, getDataFromUrl} from "../services/server";
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
const Statastics = (props) => {
    console.log("sites",getCookie(cons.SITES_DATA));

    const { closePopup, dataResponse, loading ,site,device} = props;
    const [hover,setHover]=useState(false);
    const [Index,setIndex]=useState(0);
    const [sitesData, setSitesData] = useState(getCookie(cons.SITES_DATA)?JSON.parse(getCookie(cons.SITES_DATA)):[]);
    const [sitesId, setSitesId] = useState(getCookie(cons.SELECTED_SITE)?JSON.parse(getCookie(cons.SELECTED_SITE)):null);
    const [deviceId, setDeviceId] = useState(getCookie(cons.SELECTED_DEVICE)?JSON.parse(getCookie(cons.SELECTED_DEVICE)):null);
    const [deviceData, setDeviceData] = useState(getCookie(cons.DEVICES_DATA)?JSON.parse(getCookie(cons.DEVICES_DATA)):[]);
    const data=getCookie(cons.CELL_DATA)?JSON.parse(getCookie(cons.CELL_DATA)):null;

 var tableData=data, data1=[];
    console.log("data...",data);

/*
    if(data!==null)
        data.forEach((prop,i)=>{

              //  data1.push( [prop.title, props.data.title,prop.value])
                tableData.push({id:prop.id,cellName:prop.title,voltage:prop.subtitle,status:prop.status})

        });
*/


    const percentage=50;
    const temparatureStatus = (tempStat) => {
        let tempIcon = tempStat


        return <img src={tempIcon} />
    };
    function handleMouseIn() {
        setHover(true)
    }

    function handleMouseOut() {
        setHover(false)
    }
    const tooltipStyle = {
        display: hover ? 'block' : 'none',
        marginTop: "60px",
        textAlign:"right",
        paddingTop:"10px",
    };
    const handleDashboard=(resp)=>{
        console.log("dashstatastics",resp.data.getDashboard)
        if(resp.data.getDashboard){
         //   setDashboardData(resp.data.getDashboard);
        }

    };
    const handleDeviceData=(resp)=>{
        if(resp){
            setDeviceData(resp);
        }
    };


    return (
        <div >
            <div >
                <div >
                    <div className="popupHeader">
                                                <span className="backClose" onClick={()=>{
                                                    removeCookie(cons.DEVICES_DATA);
                                                    removeCookie(cons.SITES_DATA);
                                                    removeCookie(cons.CELL_DATA);
                                                    props.history.goBack();
                                                }}><span
                                                    className="material-icons">
                            arrow_back
</span></span>


                        <select className="select_stats" placeholder={"Select Site"} value={sitesId!==null?sitesId.name:""} onChange={(event)=>{
                            console.log("select",event.target.value);
                                sitesData.forEach(o=>{
                                    if(o.name+""===event.target.value){
                                        setSitesId(o);
                                        getDataFromUrl(serverApi.GET_DEVICES_BY_SITE_ID+o.id,handleDeviceData);

                                    }
                                });
                        }}>
                            {sitesData.length>0?sitesData.map(prop=>{
                                return(<option>{prop.name}</option>)
                            }):null}
                        </select>

                        <select className="select_stats" placeholder={"Select Device"} onChange={(event)=>{
                            deviceData.forEach(o=>{
                                if(o.serialNo+""===event.target.value){
                                    getDashboardDetails({
                                        "siteId": sitesId.id,
                                        "serialNo": o.id,
                                        "auth":getCookie(cons.TOKEN_DATA)
                                    },handleDashboard);
                                    setDeviceId(o)
                                }
                            });
                        }}>
                            {deviceData.length>0?deviceData.map(prop=>{
                                return(<option>{prop.serialNo}</option>)
                            }):null}

                        </select>



                        <select className="select_stats" >
                            <option>Cells</option>
                            <option>Battery</option>
                        </select>
                        <select className="select_stats" >
                            <option>Select Parameter</option>

                            <option>Voltage</option>
                            <option>Temperature</option>
                        </select>
                        <span className="select_stats" style={{marginTop:"10px"}}>From Date :
                        <DayPickerInput
                            dayPickerProps={{
                                month: new Date(2018, 10),
                                showWeekNumbers: true,
                                todayButton: 'Today',
                            }}
                        /></span>
                        <span className="select_stats" style={{marginTop:"10px"}}>To Date :
                        <DayPickerInput
                            dayPickerProps={{
                                month: new Date(2018, 10),
                                showWeekNumbers: true,
                                todayButton: 'Today',
                            }}
                        /></span>

                        <button style={{width:"100px",height:"50px"}} type="submit" onClick={()=>{

                        }}>Search</button>
                    </div>
                    <div className="popupMainBlock">
                        {loading ? <Loader /> : <div>
                            <div className="popupTitleBlock">
                                <div className="popupTitleLeft">
{/*
                                    <div className="popupTitle">Statastics Data-{site}</div>
*/}
                                    <div className="popupSubTitle">Complete analytics of cell data</div>
                                </div>
                                {/* <div className="sitePercentage">{percentage}%<div className="meter">
                                    <span style={{ width: `${percentage}%` }} />
                                </div></div>*/}
                            </div>
                            <div className="popupTable">
                                <table >
                                    <tbody><tr>
                                        <th>Cell ID</th>
                                        <th>Cell Name</th>
                                        <th>Cell Status</th>
                                        <th>Communication Status</th>
                                        <th>Voltage</th>
                                        <th>Temperature</th>
                                    </tr>
                                    {tableData && tableData.map((record, index) => {
                                        return <tr key={index} className={"resolved"}>
                                            <td>{record.id}</td>
                                            <td>{record.ctitle}</td>
                                            <td>{record.cellStatus}</td>
                                            <td>{record.comStatus}</td>

                                            <td>{record.value1}</td>
                                            <td>{record.value2}</td>
                                        </tr>
                                    })}
                                    </tbody></table>
                            </div>

                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statastics;