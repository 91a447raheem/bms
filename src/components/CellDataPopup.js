import React from 'react';
import { Loader } from './Common'
import { temparatureIcon } from '../Assets';
const CellDataPopup = (props) => {
    const { closePopup, dataResponse, loading } = props
    const { data, location, percentage } = dataResponse

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
                        <span onClick={closePopup}>X</span>
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
                                    return <div className="betteryBlock">
                                        <div className="betteryStatusImage"><img src={temparatureIcon} /></div>
                                        <div className="betteryInformation">
                                            <div className="betteryname">Cell 1-<br /> Charging</div>
                                            <div className="betteryinfo">2.063 V - 24<sup>0</sup>C</div>
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