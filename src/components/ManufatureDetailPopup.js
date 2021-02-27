import React, { useState } from 'react';
import { Loader } from './Common'
import { returnActioncls } from '../utils'

const ManufactureDetailPopup = (props) => {
    const { closePopup, dataResponse, loading, site, device } = props
    var data = [];
    //  const [data,setData]=useState([])
    if (dataResponse)
        dataResponse.forEach(prop => {
            console.log("ggggg", prop.title)

            if (prop.title === "Mfg. Details") {
                data = prop.data
                // setData(prop.data)
                console.log("mannnnnnnnn", prop.data)
            }
        });
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
                                <div className="popupTitleLeftSites">
                                    <div className="popupTitle">See all technical and device details</div>
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
                            <div style={{ width: "100%", paddingLeft: "10px", float: "left", borderRight: "1px solid #dfdfdf" }}>
                                {data.map(o => {
                                    return <div>
                                        <div style={{ width: "20%", fontSize: "18px", overflow: "hidden", float: "left" }}>{o.title}</div>
                                        <div style={{ width: "80%", fontSize: "18px", overflow: "hidden", fontWeight: "bold", float: "right" }}>: {o.value}</div>

                                    </div>
                                })
                                }
                            </div>

                        </div>}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ManufactureDetailPopup;