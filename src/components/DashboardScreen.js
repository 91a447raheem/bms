import React, { useState } from 'react';

import {
    BatteryStatusIcon,
    CommunicationStatusIcon,
    statisticsIcon,
    technicalDetailsIcon,
    notificationBell,
    batteryCharging
} from '../Assets'
import CellDataPopup from './CellDataPopup'
import CellStatsPopup from './CellStatsPopup'

import { Header, Footer, SliderBlock, Filters, TabsList } from './Common'

const Dashboard = () => {

    const [cellData, setCellData] = useState(false)
    const [cellStats, setCellStats] = useState(false)

    const handleClickonData = () => {
        setCellData(!cellData)
    }

    const handleClickonStats = () => {
        setCellStats(!cellStats)
    }

    return (<div>
        <div className="mainBlock">
            <Header />
            <Filters />
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
                    <SliderBlock />
                </div>
            </div>
            <div className="footerTopBlock">
                <div className="container">
                    <div className="mapBlock block">
                        <div className="title">Google Map</div>
                        <div className="subtitle">Select sites from Satellite location</div>
                        <div className="map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30449.877599012394!2d78.37413608232063!3d17.448477225725714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bbe7be7792411b!2sMadhapur%2C%20Telangana!5e0!3m2!1sen!2sin!4v1609581397700!5m2!1sen!2sin" width={387} height={250} frameBorder={0} style={{ border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} />
                        </div>
                    </div>
                    <div className="cellDataBlock block">
                        <TabsList />
                    </div>
                    <div className="staticBlock block">
                        <div className="title">Statistics</div>
                        <div className="subtitle">Average statistics of the Madhapur Site</div>
                        <div className="listBlock">
                            <div className="row">
                                <div className="img"><img src={statisticsIcon} /></div>
                                <div className="content">See all statistics <br />of Manufcaturing &amp; others</div>
                                <div className="viewMore" onClick={handleClickonData}>View All</div>
                            </div>
                            <div className="row">
                                <div className="img"><img src={technicalDetailsIcon} /></div>
                                <div className="content">See all Technical<br />and Device details</div>
                                <div className="viewMore" onClick={handleClickonStats}>View All</div>
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
        <Footer />
        {cellData ? <CellDataPopup closePopup={handleClickonData} /> : null}
        {cellStats ? <CellStatsPopup closePopup={handleClickonStats} /> : null}
    </div>
    );
}

export default Dashboard;