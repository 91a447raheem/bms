import React from 'react';

import {
    BatteryStatusIcon,
    CommunicationStatusIcon,
    statisticsIcon,
    technicalDetailsIcon,
    notificationBell,
    batteryCharging
} from '../Assets'

const Dashboard = () => {
    return (<div>
        <div className="mainBlock">
            <header>
                <div className="headerBlock">
                    <div className="container">
                        <div className="logo_block"><a href="#">BMS Battery Management System</a></div>
                        <div className="right_block">
                            <div className="notificationIcon">
                                <i className="fa fa-bell" aria-hidden="true" />
                            </div>
                            <div className="userProfile">
                                <span>VJ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="fliterOptions">
                <div className="container">
                    <ul>
                        <li>
                            <div className="Icon"><i className="fa fa-filter" aria-hidden="true" /></div>
                            <select className="siteOptions">
                                <option>Madhapur site</option>
                                <option>Ameerpet site</option>
                            </select>
                        </li>
                        <li>
                            <select>
                                <option>VJ0021534</option>
                            </select>
                        </li>
                        <li>
                            <div className="date">12-02-2020 <div className="calendarIcon"><i className="fa fa-calendar" aria-hidden="true" /></div></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="countBlock">
                <div className="container">
                    <ul>
                        <li>
                            <div className="block">
                                <div className="locationname">Madhapur</div>
                                <div className="siteStatus">Site Status (Vajra Technos)</div>
                            </div>
                        </li>
                        <li>
                            <div className="block">
                                <div className="number">28</div>
                                <div className="numberRightBlock">
                                    <div className="title">Total number of</div>
                                    <div className="sitesSubtitle">Sites</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="block">
                                <div className="number">08</div>
                                <div className="numberRightBlock">
                                    <div className="title">Affected</div>
                                    <div className="sitesSubtitle">Sites</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="block">
                                <div className="number">03</div>
                                <div className="numberRightBlock">
                                    <div className="title">Communication</div>
                                    <div className="sitesSubtitle">Sites</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="block">
                                <div className="number">04</div>
                                <div className="numberRightBlock">
                                    <div className="title">Resolved</div>
                                    <div className="sitesSubtitle">Sites</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="block">
                                <div className="number">07</div>
                                <div className="numberRightBlock">
                                    <div className="title">Pending</div>
                                    <div className="sitesSubtitle">Sites</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="extra">
                                <div className="extraIcon">...</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sliderBlock">
                <div className="container">
                    <div className="slider">
                        <div className="preSlider"><div className="icon"><i className="fa fa-chevron-left" aria-hidden="true" /></div></div>
                        <ul>
                            <li>
                                <div className="block">
                                    <div className="title">Cell Voltage (24)</div>
                                    <div className="images"><img src={BatteryStatusIcon} /></div>
                                    <div className="subtitle">normal</div>
                                </div>
                            </li>
                            <li>
                                <div className="block">
                                    <div className="title">String Current</div>
                                    <div className="images"><img src={BatteryStatusIcon} /></div>
                                    <div className="subtitle">8 Of 15 Normal</div>
                                </div>
                            </li>
                            <li>
                                <div className="block">
                                    <div className="title">State of change</div>
                                    <div className="images"><img src={BatteryStatusIcon} /></div>
                                    <div className="subtitle">Communicating</div>
                                </div>
                            </li>
                            <li>
                                <div className="block">
                                    <div className="title">Battery Status</div>
                                    <div className="images"><img src={BatteryStatusIcon} /></div>
                                    <div className="subtitle">15 of Betteries are Charging</div>
                                </div>
                            </li>
                            <li>
                                <div className="block">
                                    <div className="title">String Voltage</div>
                                    <div className="images"><img src={BatteryStatusIcon} /></div>
                                    <div className="subtitle">normal</div>
                                </div>
                            </li>
                            <li>
                                <div className="block">
                                    <div className="title">Communication Status</div>
                                    <div className="images communicatingIcon"><img src={CommunicationStatusIcon} /></div>
                                    <div className="subtitle">Communicating</div>
                                </div>
                            </li>
                            <li>
                                <div className="block">
                                    <div className="title">Amblent Temparature</div>
                                    <div className="images"><img src={BatteryStatusIcon} /></div>
                                    <div className="subtitle">normal</div>
                                </div>
                            </li>
                        </ul>
                        <div className="nextSlider"><div className="icon"><i className="fa fa-chevron-right" aria-hidden="true" /></div></div>
                    </div>
                </div>
            </div>
            <div className="footerTopBlock">
                <div className="container">
                    <div className="mapBlock block">
                        <div className="title">Google Map</div>
                        <div className="subtitle">Select sites from Satellite location</div>
                        <div className="map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30449.877599012394!2d78.37413608232063!3d17.448477225725714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bbe7be7792411b!2sMadhapur%2C%20Telangana!5e0!3m2!1sen!2sin!4v1609581397700!5m2!1sen!2sin" width={387} height={250} frameBorder={0} style={{ border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} /></div>
                    </div>
                    <div className="cellDataBlock block">
                        <div className="title">Cell Data</div>
                        <div className="subtitle">Charging status of each location</div>
                        <div className="tabbed-area">
                            <ul className="tabs group">
                                <li className="active"><a href="#box-one">Pictorial</a></li>
                                <li><a href="#box-two">Graphical</a></li>
                                <li><a href="#box-three">Tabular</a></li>
                            </ul>
                            <div className="box-wrap">
                                <div id="box-one">
                                    <div className="borderImage"><img src={batteryCharging} /></div>
                                    <div className="block">
                                        <div className="number">65%</div>
                                        <div className="numberRightBlock">
                                            <div className="title">Average</div>
                                            <div className="sitesSubtitle">Charging Status</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="staticBlock block">
                        <div className="title">Statistics</div>
                        <div className="subtitle">Average statistics of the Madhapur Site</div>
                        <div className="listBlock">
                            <div className="row">
                                <div className="img"><img src={statisticsIcon} /></div>
                                <div className="content">See all statistics <br />of Manufcaturing &amp; others</div>
                                <div className="viewMore"><a href="#">View All</a></div>
                            </div>
                            <div className="row">
                                <div className="img"><img src={technicalDetailsIcon} /></div>
                                <div className="content">See all Technical<br />and Device details</div>
                                <div className="viewMore"><a href="#">View All</a></div>
                            </div>
                            <div className="row">
                                <div className="img"><img src={notificationBell} /></div>
                                <div className="content">See all notification<br /> and others</div>
                                <div className="viewMore"><a href="#">View All</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div className="capyRights">Powered by Vajra IOT-Copyright &amp; Terms and Conditions 2020</div>
        </footer>
    </div>
    );
}

export default Dashboard;