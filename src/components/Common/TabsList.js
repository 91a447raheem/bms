import React from 'react';
import {
    batteryCharging
} from '../../Assets'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TabsList = () => {
    return (
        <React.Fragment>
            <div className="title">Cell Data</div>
            <div className="subtitle">Charging status of each location</div>
            <div className="tabbed-area">
                <Tabs>
                    <TabList>
                        <Tab>Pictorial</Tab>
                        <Tab>Graphical</Tab>
                        <Tab>Tabular</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="borderImage"><img src={batteryCharging} /></div>
                        <div className="block">
                            <div className="number">65%</div>
                            <div className="numberRightBlock">
                                <div className="title">Average</div>
                                <div className="sitesSubtitle">Charging Status</div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="borderImage"><img src={batteryCharging} /></div>
                        <div className="block">
                            <div className="number">25%</div>
                            <div className="numberRightBlock">
                                <div className="title">Mid Graphical</div>
                                <div className="sitesSubtitle">Charging Status</div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="borderImage"><img src={batteryCharging} /></div>
                        <div className="block">
                            <div className="number">25%</div>
                            <div className="numberRightBlock">
                                <div className="title">Mid Tabular</div>
                                <div className="sitesSubtitle">Charging Status</div>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </React.Fragment>);
}

export default TabsList;