import React from 'react';
import { Loader } from './Common'
import { returnActioncls } from '../utils'

const NotificationsPopup = (props) => {
    const { closePopup, dataResponse, loading,site,device } = props
    const  data = dataResponse;
    return (
        <div className="popupBlockContainer">
            <div className="popupBlockMain">
                <div className="popupBlock">
                    <div className="popupHeader">

                        <span className="popupClose" onClick={closePopup}><span className="material-icons">
                            close
</span></span>
                    </div>

                    <div className="popupMainBlock">
                        {loading ? <Loader /> : <div>
                            <div className="popupTitleBlock">
                                <div className="popupTitleLeft">
                                    <div className="popupTitle">Notifications</div>
{/*
                                    <div className="popupSubTitle">complete analytics cell data</div>
*/}
                                </div>
{/*
                                <div className="sitePercentage">{percentage}%<div className="meter">
                                    <span style={{ width: `${percentage}%` }} />
                                </div></div>
*/}
                            </div>
                            <div className="popupTable" style={{maxHeight:330,overflowY:'auto'}}>
                                <table>
                                    <tbody><tr>
                                        <th>Date</th>
                                        <th>Notification</th>

                                    </tr>
                                    {data && data.map((record, index) => {
                                       // console.log("returnActioncls(record.action)",returnActioncls(record.action))
                                        return <tr key={index}/* className={returnActioncls(record.action)}*/>
                                            <td>{record.createdAt}</td>
                                            <td>{record.title}</td>

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

export default NotificationsPopup;