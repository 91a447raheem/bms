import React, {useState} from 'react';
import { Loader } from './Common'
import { temparatureIcon } from '../Assets';
const SitesDataPopup = (props) => {
    const { closePopup, data, loading ,site,device,sites,name,isSite} = props;
    console.log("sites data",data);
    const [hover,setHover]=useState(false);
    const [Index,setIndex]=useState(0);
    console.log("data...",name+"kk");

    /*
        const { data, location, percentage } = dataResponse
    */
const percentage=50;
    const temparatureStatus = (tempStat) => {
        let tempIcon = tempStat

      /*  if (tempStat == "hightemp") {
            tempIcon = temparatureIcon
        } else if (tempStat == "lowvoltage") {
            tempIcon = temparatureIcon
        } else if (tempStat == "discharge") {
            tempIcon = temparatureIcon
        }*/

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
    }
    return (
        <div className="popupBlockContainer">
            <div className="popupBlockMain">
                <div className="popupBlock">
                    <div className="popupHeader">
                        <span className="popupClose" onClick={()=>{closePopup(null)}}><span class="material-icons">
                            close
</span></span>
                    </div>
                    <div className="popupMainBlock">
                        {loading ? <Loader /> : <div>
                            <div className="popupTitleBlock">
                                <div className="popupTitleLeftSites">
                                    <div className="popupTitle">{props.name}</div>
                                </div>
                            </div>
                            <div className="popupTable" style={{maxHeight:400,overflowY:'auto'}}>
                                    <table >
                                        <tbody><tr>
                                            <th>Site Name</th>
                                            {!isSite?<th>Serial No</th>:null}
                                            <th>Manufacturer</th>
                                            <th>First Used Date</th>
                                            <th>Ah Capacity</th>
                                            <th>Battery S.No</th>
                                            <th>Design Voltage</th>
                                            <th>Battery Bank Type</th>

                                            <th>Individual Cell Voltage</th>
                                            {/*
                                            <th>Location</th>
*/}
                                            <th>Latitude</th>
                                            <th>Longitude</th>
                                        </tr>
                                        {!isSite?
                                            sites.map((record, index) => {

                                                var manufactureDetails=null,location=null;
                                                data.forEach(prop=>{
                                                    if(prop.id===record.siteId){
                                                        location=prop.location
                                                        manufactureDetails=prop.manufactureDetails;

                                                    }
                                                });
                                                return <tr key={index}/* className={returnActioncls(record.action)}*/  onClick={()=>{closePopup(record)}}>
                                                    <td>{record.siteId}</td>
                                                    <td>{record.serialNo}</td>
                                                    <td>{manufactureDetails?manufactureDetails.manufacturerDetails:""}</td>
                                                    <td>{manufactureDetails?manufactureDetails.firstUsedDate:""}</td>
                                                    <td>{manufactureDetails?manufactureDetails.ahCapacity:""}</td>
                                                    <td>{manufactureDetails?manufactureDetails.batterySerialNumber:""}</td>
                                                    <td>{manufactureDetails?manufactureDetails.designVoltage:""}</td>
                                                    <td>{manufactureDetails?manufactureDetails.typeOfBatteryBank:""}</td>
                                                    <td>{manufactureDetails?manufactureDetails.individualCellVoltage:""}</td>

                                                    <td>{location?location.latitude:""}</td>
                                                    <td>{location?location.longitude:""}</td>

                                                    {/*
                                                <td>{record.siteAddress?record.siteAddress.addrStr+", "+record.siteAddress.city+", "+record.siteAddress.state+", "+record.siteAddress.country:""}</td>
*/}

                                                    {/*  <td>{record.temparature}<sup>0</sup></td>
                                            <td>{record.presentCondition}</td>
                                            <td className={returnActioncls(record.action)}>{record.action}</td>*/}
                                                </tr>
                                            }):  data.map((record, index) => {
                                            // console.log("returnActioncls(record.action)",returnActioncls(record.action))
                                            return <tr key={index}/* className={returnActioncls(record.action)}*/  onClick={()=>{closePopup(record)}}>
                                                <td>{record.name}</td>
                                                <td>{record.manufactureDetails?record.manufactureDetails.manufacturerDetails:""}</td>
                                                <td>{record.manufactureDetails?record.manufactureDetails.firstUsedDate:""}</td>
                                                <td>{record.manufactureDetails?record.manufactureDetails.ahCapacity:""}</td>
                                                <td>{record.manufactureDetails?record.manufactureDetails.batterySerialNumber:""}</td>
                                                <td>{record.manufactureDetails?record.manufactureDetails.designVoltage:""}</td>
                                                <td>{record.manufactureDetails?record.manufactureDetails.typeOfBatteryBank:""}</td>
                                                <td>{record.manufactureDetails?record.manufactureDetails.individualCellVoltage:""}</td>

                                                <td>{record.location?record.location.latitude:""}</td>
                                                <td>{record.location?record.location.longitude:""}</td>

                                                {/*
                                                <td>{record.siteAddress?record.siteAddress.addrStr+", "+record.siteAddress.city+", "+record.siteAddress.state+", "+record.siteAddress.country:""}</td>
*/}

                                                {/*  <td>{record.temparature}<sup>0</sup></td>
                                            <td>{record.presentCondition}</td>
                                            <td className={returnActioncls(record.action)}>{record.action}</td>*/}
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

export default SitesDataPopup;