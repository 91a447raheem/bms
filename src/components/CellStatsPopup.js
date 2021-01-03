import React from 'react';
import { Loader } from './Common'
import { returnActioncls } from '../utils'

const CellStatsPopup = (props) => {
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
                                <table>
                                    <tbody><tr>
                                        <th>Cell No</th>
                                        <th>Cell ID</th>
                                        <th>Bettery Status</th>
                                        <th>Voltage</th>
                                        <th>Centegrate</th>
                                        <th>Temparature</th>
                                        <th>Present Condition</th>
                                        <th>Action</th>
                                    </tr>
                                        {data && data.map((record, index) => {
                                            return <tr key={index}>
                                                <td>{index}</td>
                                                <td>{record.cellId}</td>
                                                <td>{record.batteryStatus}</td>
                                                <td>{record.voltage}</td>
                                                <td>{record.centegrade}<sup>0</sup></td>
                                                <td>{record.temparature}<sup>0</sup></td>
                                                <td>{record.presentCondition}</td>
                                                <td className={returnActioncls(record.action)}>{record.action}</td>
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

export default CellStatsPopup;