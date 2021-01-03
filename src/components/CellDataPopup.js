import React from 'react';
import { Loader } from './Common'
import { temparatureIcon } from '../Assets';
const CellDataPopup = (props) => {
    const { closePopup, dataResponse, loading } = props
    const { data, location, percentage } = dataResponse

    const temparatureStatus = (tempStat) => {
        let tempIcon = temparatureIcon

        if (tempStat == "hightemp") {
            tempIcon = temparatureIcon
        } else if (tempStat == "lowvoltage") {
            tempIcon = temparatureIcon
        } else if (tempStat == "discharge") {
            tempIcon = temparatureIcon
        }

        return <img src={tempIcon} />
    }

    return (
        <div className="popupBlockContainer">
            <div className="popupBlockMain">
                <div className="popupBlock">
                    <div className="popupHeader">
                        <select className="loation">
                            <option>Select Location</option>
                            <option>Madhapur</option>
                            <option>Ameerpet</option>
                        </select>
                        <select className="id">
                            <option>Select ID</option>
                            <option>Madhapur</option>
                            <option>Ameerpet</option>
                        </select>
                        <select className="status">
                            <option>Select Status</option>
                            <option>Resolved</option>
                            <option>Pending</option>
                            <option>Medium</option>
                            <option>Low</option>
                            <option>High Risk</option>
                        </select>
                        <span className="popupClose" onClick={closePopup}><span class="material-icons">
                            close
</span></span>
                    </div>
                    <div className="popupMainBlock">
                        {loading ? <Loader /> : <div>
                            <div className="popupTitleBlock">
                                <div className="popupTitleLeft">
                                    <div className="popupTitle">Cell Data-{location}</div>
                                    <div className="popupSubTitle">complete analytics detailed reports of Cell data</div>
                                </div>
                                <div className="sitePercentage">{percentage}%<div className="meter">
                                    <span style={{ width: `${percentage}%` }} />
                                </div></div>
                            </div>
                            <div className="popupTable">
                                {data && data.map((record, index) => {
                                    return <div className="betteryBlock" key={index}>
                                        <div className="betteryStatusImage">{temparatureStatus(record.tempStatus)}</div>
                                        <div className="betteryInformation">
                                            <div className="betteryname">{record.cellTitle}</div>
                                            <div className="betteryinfo">{record.batteryInfo}<sup>0</sup>C</div>
                                        </div>
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