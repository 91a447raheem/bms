import React from 'react';
import { Loader } from './Common'
const CellDataPopup = (props) => {
    const { closePopup, loading } = props
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
                                    <div className="popupTitle">Cell Data-Madhapur</div>
                                    <div className="popupSubTitle">complete analytics detailed reports of Cell data</div>
                                </div>
                                <div className="sitePercentage">80%<div className="meter">
                                    <span style={{ width: '80%' }} />
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
                                        <tr>
                                            <td>1</td>
                                            <td>VA123456</td>
                                            <td>15% Charge</td>
                                            <td>2.49V</td>
                                            <td>22<sup>0</sup></td>
                                            <td>220<sup>0</sup></td>
                                            <td>Normal</td>
                                            <td className="resolved">Resolved</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>VA123456</td>
                                            <td>15% Charge</td>
                                            <td>2.49V</td>
                                            <td>22<sup>0</sup></td>
                                            <td>220<sup>0</sup></td>
                                            <td>Medium</td>
                                            <td className="pending">Pending</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>VA123456</td>
                                            <td>15% Charge</td>
                                            <td>2.49V</td>
                                            <td>22<sup>0</sup></td>
                                            <td>220<sup>0</sup></td>
                                            <td>Coummnicating</td>
                                            <td className="resolved">Resolved</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>VA123456</td>
                                            <td>15% Charge</td>
                                            <td>2.49V</td>
                                            <td>22<sup>0</sup></td>
                                            <td>220<sup>0</sup></td>
                                            <td>Charging</td>
                                            <td className="resolved">Resolved</td>
                                        </tr>
                                        <tr className="highRisk">
                                            <td>5</td>
                                            <td>VA123456</td>
                                            <td>15% Charge</td>
                                            <td>2.49V</td>
                                            <td>22<sup>0</sup></td>
                                            <td>220<sup>0</sup></td>
                                            <td>Charging</td>
                                            <td className="highrisk">High Risk</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>VA123456</td>
                                            <td>15% Charge</td>
                                            <td>2.49V</td>
                                            <td>22<sup>0</sup></td>
                                            <td>220<sup>0</sup></td>
                                            <td>Normal</td>
                                            <td className="medium">Medium</td>
                                        </tr>
                                        <tr><td>7</td>
                                            <td>VA123456</td>
                                            <td>15% Charge</td>
                                            <td>2.49V</td>
                                            <td>22<sup>0</sup></td>
                                            <td>220<sup>0</sup></td>
                                            <td>Normal</td>
                                            <td className="resolved">Resolved</td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>VA123456</td>
                                            <td>15% Charge</td>
                                            <td>2.49V</td>
                                            <td>22<sup>0</sup></td>
                                            <td>220<sup>0</sup></td>
                                            <td>Normal</td>
                                            <td className="low">Low</td>
                                        </tr>
                                    </tbody></table>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CellDataPopup;