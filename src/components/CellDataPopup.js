import React, {useState} from 'react';
import { Loader } from './Common'
import { temparatureIcon } from '../Assets';
const CellDataPopup = (props) => {
    const { closePopup, dataResponse, loading ,site,device,allCells,iconsData,statasticsData} = props;
    const [hover,setHover]=useState(false);
    const [Index,setIndex]=useState(0);
    const [data,setData]=useState(dataResponse);
    const [selectedCell,setSelectedCell]=useState(props.selectedCell);

    console.log("iconsData",iconsData);

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
                        <select className="loation">
                            <option>{site}</option>
                          {/*  <option>Madhapur</option>
                            <option>Ameerpet</option>*/}
                        </select>
                        <select className="id">
                            <option>{device}</option>
                          {/*  <option>Madhapur</option>
                            <option>Ameerpet</option>*/}
                        </select>
                        <select className="id" value={selectedCell} onChange={(event)=>{
                            setSelectedCell(event.target.value);
                            var title=event.target.value;

                            if(title==="All Cells"){
                                setData(statasticsData)
                            }else{
                                var has=false;
                                allCells.forEach(prop=>{
                                    if(prop.title===event.target.value){
                                        setData(prop.cellDetails)
                                        has=true
                                    }
                                })
                                if(!has){
                                    setData([])

                                }

/*
                              if (title === "Total Cells") {
                                    console.log("allCells", allCells);
                                  setData(allCells)
                                } else if (title === "Problem Cells") {
                                    var data = []
                                    allCells.forEach(prop => {
                                        if (prop.CellStatus !== "Charging" && prop.CellStatus !== "Discharging") {
                                            data.push(prop)
                                        }
                                    });
                                    setData(data);
                                } else if (title === "Communicating") {
                                    var data = []
                                    allCells.forEach(prop => {
                                        if (prop.ComStatus === "Communicating") {
                                            data.push(prop)
                                        }
                                    });
                                    setData(data);
                                } else if (title=== "Not Communicating") {
                                    var data = []
                                    allCells.forEach(prop => {
                                        if (prop.ComStatus === "Not Communicating") {
                                            data.push(prop)
                                        }
                                    });
                                    setData(data);
                                } else {
                                    var data = []
                                    allCells.forEach(prop => {
                                        if (prop.CellStatus === title) {
                                            data.push(prop)
                                        }
                                    });
                                    setData(data);
                                }
*/
                            }
                               // setData(dataResponse)
                        }}>
                            <option>All Cells</option>
                            {Object.keys(iconsData).map((item, i) => (
                                 <option>{item}</option>
                            ))}
                          {/*  {iconsData?iconsData.map(prop=>{
                               return <option>{prop.title}</option>
                            }):null}*/}

                        </select>
                        <div className="lastPacket1" >Last Packet Received Time
                            : {props.lastPacketReceivedTime}</div>

                        {/*
                        <select className="status">
                            <option>Select Status</option>
                            <option>Resolved</option>
                            <option>Pending</option>
                            <option>Medium</option>
                            <option>Low</option>
                            <option>High Risk</option>
                        </select>
*/}
                        <span className="popupClose" onClick={closePopup}><span class="material-icons">
                            close
</span></span>
                    </div>
                    <div className="popupMainBlock">
                        {loading ? <Loader /> : <div>
                            <div className="popupTitleBlock">
{/*
                                <div className="popupTitleLeft">



                                    <div className="popupSubTitle">Last Packet Received Time</div>
                                    <div className="popupSubTitle">{props.lastPacketReceivedTime}</div>

                                </div>
*/}
                                <div className="popupTitleRight" style={{float:"right"}}>
                                    {iconsData?Object.keys(iconsData).map((item, i) => (
                                        <div className="popupicons" key={i}>
                                            <div className="popupicons1">
                                            <div className="betteryStatusImage">{temparatureStatus(iconsData[item])}</div></div>
                                            <div className="betteryname1"  >{item}</div>
                                        </div>
                                    )):null}
{/*
                                    {iconsData && iconsData.map((record, index) => {
                                        return <div className="popupicons" key={index}>
                                            <div className="betteryStatusImage">{temparatureStatus(record.iconUrl)}</div>
                                            <div className="betteryname"  >{record.title}</div>
                                        </div>
                                    })}
*/}
                                </div>

                            </div>
                            <div className="popupTable" style={{maxHeight:450,overflowY:'auto',marginTop:"10px"}}>
                                {data && data.map((record, index) => {
                                    return <div className="betteryBlock" key={index}>
                                        <div className="betteryStatusImage">{temparatureStatus(record.icon)}</div>
                                        <div className="betteryInformation">
                                            <div className="betteryinfo">{record.value1}{/*<sup>0</sup>C*/}</div>
                                            <div className="betteryinfo">{record.value2}{/*<sup>0</sup>C*/}</div>

                                        </div>
                                        <div className="betteryname"  onMouseOver={()=>{
                                            handleMouseIn();
                                            setIndex(index)

                                        }} onMouseOut={handleMouseOut}>{record.ctitle}</div>

{/*
                                        {index===Index?<div style={tooltipStyle}>{record.ctitle}<br/>{record.Value1}<br/>{record.Value2}</div>:null}
*/}
                                    </div>
                                })}
                            </div>

                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CellDataPopup;