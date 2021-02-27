import React, { useState } from 'react';
import { Loader } from './Common'
import { getDashboardDetails, getDataFromUrl, requestList } from "../services/server";
import cons, { serverApi } from "../helper/Consts";
import DayPickerInput from "react-day-picker/DayPickerInput";
import 'react-day-picker/lib/style.css';
import { statisticsIcon } from "../Assets";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ExportToExcel from "./Common/ExportToExcel";
import moment from 'moment';
import IconButton from "@material-ui/core/IconButton";
import ReactEcharts from "./ReactECharts";

const CellStatsPopup = (props) => {
    const { closePopup, dataResponse, loading, dashboardData, cellsData } = props;
    const data = dataResponse;
    const [sitesData, setSitesData] = useState(props.sitesData ? props.sitesData : []);
    const [sitesId, setSitesId] = useState(props.siteId ? props.siteId : null);
    const [deviceId, setDeviceId] = useState(props.device ? props.device : null);
    const [deviceData, setDeviceData] = useState(props.deviceData ? props.deviceData : []);
    const [isCell, setIsCell] = useState(true);
    const [param, setParam] = useState(null);
    const [paramName, setParamName] = useState(null);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [noOfRows, setNoOfRows] = useState("20");
    const [pageNo, setPageNo] = useState(1);
    const [pageSizeOptions, setPageSizeOptions] = useState([10, 20, 50, 100, 200, 300, 500, 1000]);
    const [isGraph, setIsGraph] = useState(false);

    const [selectedCell, setSelectedCell] = useState(null);

    var paramsData = [];
    if (dashboardData) {
        dashboardData.forEach(prop => {
            if (prop.title === "String Info") {
                paramsData = prop.data;
            }
        })
    }

    /*   if(data)
           data.forEach(prop=>{
           tableData.push( {id:prop.id+"",ctitle:prop.ctitle,cellStatus:prop.cellStatus,comStatus:prop.comStatus,value1:prop.value1,value2:prop.value2})
       })*/
    var data1 = [];

    var columns = [];
    if (isCell) {
        columns = [
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Time',
                accessor: 'time',
            },
            {
                Header: 'Name',
                accessor: 'cellName',
            },
            {
                Header: 'Voltage',
                accessor: 'voltageValue',
            },
            {
                Header: 'Temperature',
                accessor: 'temperatureValue',
            },
            {
                Header: 'Communicatuin Status',
                accessor: 'commStatus',
            },
            {
                Header: 'Temperature Status',
                accessor: 'temperature',
            },
            {
                Header: 'Voltage Status',
                accessor: 'voltage',
            }
        ]
    }
    else {

        columns = [
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Time',
                accessor: 'time',
            }, {
                Header: 'String Voltage',
                accessor: 'stringVoltage',
            },
            {
                Header: 'Current',
                accessor: 'current',
            },
            {
                Header: 'SOC',
                accessor: 'stateOfCharge_SOC',
            },
            {
                Header: 'DOD',
                accessor: 'depthOfDischarge_DOD',
            },
            {
                Header: 'Ambient Temperature',
                accessor: 'ambientTemperature',
            },
            {
                Header: 'Charge Diascharge Cycles',
                accessor: 'chargeDischargeCycles',
            },
            {
                Header: 'ampere Hour In',
                accessor: 'ampereHourIn',
            },
            {
                Header: 'ampere Hour Out',
                accessor: 'ampereHourOut',
            },
            {
                Header: 'Charging Energy',
                accessor: 'chargingEnergy',
            },
            {
                Header: 'Discharging Energy',
                accessor: 'dischargingEnergy',
            },
            {
                Header: 'Battery Run Hours',
                accessor: 'batteryRunHours',
            },
            {
                Header: 'Peak Charge Current',
                accessor: 'peakChargeCurrent',
            },
            {
                Header: 'Avg. Charge Current',
                accessor: 'averageChargeCurrent',
            },
            {
                Header: 'Charge Time',
                accessor: 'chargeTime',
            },
            {
                Header: 'Discharge Time',
                accessor: 'dischargeTime',
            },
            {
                Header: 'Hourly Avg Temp',
                accessor: 'hourlyAvgTemp',
            },
            {
                Header: 'Cumulative Avg Temp',
                accessor: 'cummulativeAvgTemp',
            }
        ]
        if (param !== null) {

            var columns1 = [
                {
                    Header: 'Date',
                    accessor: 'date',
                },
                {
                    Header: 'Time',
                    accessor: 'time',
                }
            ];
            columns.forEach((prop, i) => {
                console.log("ppp", i + 2, param)
                if (i === param + 2)
                    columns1.push(prop);
            })
            columns = columns1;
        }
    }

    const handleDashboard = (resp) => {
        console.log("dashstatastics", resp.data.getDashboard)
        if (resp.data.getDashboard) {
            //   setDashboardData(resp.data.getDashboard);
        }

    };
    /*
        function formatDate(date, format, locale) {
            return dateFnsFormat(date, format, { locale });
        }
    */
    const handleDeviceData = (resp) => {
        if (resp) {
            setDeviceData(resp);
        }
    };
    const getData = (pageNo, rows) => {
        var data = {
            "siteId": sitesId.id,
            "deviceId": deviceId.serialNo,
            "cellOrBattery": !isCell ? "battery" : "cell",
            "cellNo": "",
            "fromDate": fromDate !== "" ? fromDate + " 00:00" : "",
            "toDate": toDate !== "" ? toDate + " 00:00" : "",
            "page": pageNo,
            "rowsCount": rows
        };
        setIsLoading(true);
        requestList(serverApi.GET_STATASTICS, data, handleStats)
    };
    const handleStats = (resp) => {
        console.log("rep...", resp);
        if (resp)
            setTotalPages(resp.totalPages);

        if (isCell) {
            columns = [
                {
                    Header: 'Date',
                    accessor: 'date',
                },
                {
                    Header: 'Time',
                    accessor: 'time',
                },
                {
                    Header: 'Name',
                    accessor: 'cellName',
                },
                {
                    Header: 'Voltage',
                    accessor: 'voltageValue',
                },
                {
                    Header: 'Temperature',
                    accessor: 'temperatureValue',
                },
                {
                    Header: 'Communicatuin Status',
                    accessor: 'commStatus',
                },
                {
                    Header: 'Temperature Status',
                    accessor: 'temperature',
                },
                {
                    Header: 'Voltage Status',
                    accessor: 'voltage',
                }
            ];
            if (resp.cellRes) {
                var data = []; var sizes = [];
                resp.cellRes.forEach((prop, i) => {
                    if (selectedCell !== null) {
                        prop.cells.forEach(o => {
                            if (o.cellName === selectedCell)
                                data.push(o)
                        });
                        setNoOfRows(20);

                    } else {
                        setNoOfRows(prop.cells.length);
                        sizes.push((i + 1) * prop.cells.length);
                        data.push(...prop.cells);
                    }
                })
                if (selectedCell === null)
                    setPageSizeOptions(sizes)
                else
                    setPageSizeOptions([10, 20, 50, 100, 200, 300, 500, 1000])


            }
            setTableData(data);
            setIsLoading(false)

        }
        else {
            columns = [
                {
                    Header: 'Date',
                    accessor: 'date',
                },
                {
                    Header: 'Time',
                    accessor: 'time',
                }, {
                    Header: 'String Voltage',
                    accessor: 'stringVoltage',
                },
                {
                    Header: 'Current',
                    accessor: 'current',
                },
                {
                    Header: 'SOC',
                    accessor: 'stateOfCharge_SOC',
                },
                {
                    Header: 'DOD',
                    accessor: 'depthOfDischarge_DOD',
                },
                {
                    Header: 'Ambient Temperature',
                    accessor: 'ambientTemperature',
                },
                {
                    Header: 'Charge Diascharge Cycles',
                    accessor: 'chargeDischargeCycles',
                },
                {
                    Header: 'ampere Hour In',
                    accessor: 'ampereHourIn',
                },
                {
                    Header: 'ampere Hour Out',
                    accessor: 'ampereHourOut',
                },
                {
                    Header: 'Charging Energy',
                    accessor: 'chargingEnergy',
                },
                {
                    Header: 'Discharging Energy',
                    accessor: 'dischargingEnergy',
                },
                {
                    Header: 'Battery Run Hours',
                    accessor: 'batteryRunHours',
                },
                {
                    Header: 'Peak Charge Current',
                    accessor: 'peakChargeCurrent',
                },
                {
                    Header: 'Avg. Charge Current',
                    accessor: 'averageChargeCurrent',
                },
                {
                    Header: 'Charge Time',
                    accessor: 'chargeTime',
                },
                {
                    Header: 'Discharge Time',
                    accessor: 'dischargeTime',
                },
                {
                    Header: 'Hourly Avg Temp',
                    accessor: 'hourlyAvgTemp',
                },
                {
                    Header: 'Cumulative Avg Temp',
                    accessor: 'cummulativeAvgTemp',
                }
            ];

            setPageSizeOptions([10, 20, 50, 100, 200, 300, 500, 1000])
            setTableData(resp.batteryRes);
            setIsLoading(false);
            setNoOfRows(20);

        }
    };
    var xAxis = [], yAxis = [], xAxisName = "Date Time", yAxisName = "";
    var excelData = tableData.map(prop => {
        xAxis.push(prop.date + " " + prop.time);
        if (isCell) {
            if (param === 0) {
                var val = prop.voltageValue.split(" ");
                yAxis.push(val[0]);
                yAxisName = val[1];
            } else {
                var val = prop.temperatureValue.replace('°C', '');
                yAxis.push(val);
                yAxisName = '°C';
            }
        } else {
            var val = prop[columns[2].accessor].split(" ");
            yAxis.push(val[0]);
            yAxisName = val[1];
            console.log("deviceId", val[0]);
        }
        return { site: sitesId.name, device: deviceId.id, ...prop }
    });
    return (
        <div className="popupBlockContainer">
            <div className="popupBlockMain">
                <div className="popupBlock">
                    <div className="popupHeader">
                        <select className="select_stats" placeholder={"Select Site"} value={sitesId !== null ? sitesId.name : ""} onChange={(event) => {
                            console.log("select", event.target.value);
                            sitesData.forEach(o => {
                                if (o.name + "" === event.target.value) {
                                    setSitesId(o);

                                    getDataFromUrl(serverApi.GET_DEVICES_BY_SITE_ID + o.id, handleDeviceData);

                                }
                            });
                        }}>
                            {sitesData.length > 0 ? sitesData.map(prop => {
                                return (<option>{prop.name}</option>)
                            }) : null}
                        </select>

                        <select className="select_stats" placeholder={"Select Device"} onChange={(event) => {
                            deviceData.forEach(o => {
                                if (o.serialNo + "" === event.target.value) {
                                    setDeviceId(o)

                                }
                            });
                        }}>
                            {deviceData.length > 0 ? deviceData.map(prop => {
                                return (<option>{prop.serialNo}</option>)
                            }) : null}

                        </select>



                        <select className="select_stats" onChange={(event) => {
                            setIsCell(!isCell);
                            setIsGraph(false)
                            setTableData([]);
                            setParam(null);
                            setSelectedCell(null);
                            setPageNo(1);
                            if (!isCell) {
                                setNoOfRows(20);
                            } else {
                                setNoOfRows(1)
                            }
                        }}>
                            <option>Cells</option>
                            <option>Battery</option>
                        </select>
                        {isCell ? <select className="select_stats" onChange={(event) => {
                            if (event.target.value === "All Cells") {
                                setSelectedCell(null)
                            } else
                                setSelectedCell(event.target.value)

                        }}>
                            <option>All Cells</option>
                            {cellsData && cellsData.map((record, index) => {
                                return <option>{record.ctitle}</option>

                            })}

                        </select> : null}

                        {isCell ? <select className="select_stats" onChange={(event) => {
                            if (event.target.value === "All Params") {
                                setParam(null);

                                setParamName(event.target.value)

                            }
                            else {
                                setParamName(event.target.value)
                                setParam(event.target.value === "Voltage" ? 0 : 1)

                            }
                        }}>
                            <option>All Params</option>

                            <option>Voltage</option>
                            <option>Temperature</option>
                        </select> : <select className="select_stats" onChange={(event) => {
                            setParamName(event.target.value)

                            if (event.target.value === "All Params")
                                setParam(null);
                            else {
                                paramsData.forEach((prop, i) => {
                                    if (prop.title === event.target.value)
                                        setParam(i)

                                });
                            }
                        }}>
                                <option>All Params</option>
                                {paramsData.map(prop => {
                                    return <option>{prop.title}</option>
                                })}
                            </select>}


                            From Date :
                        <DayPickerInput
                            dayPickerProps={{
                                month: new Date(),
                                showWeekNumbers: true,
                                todayButton: 'Today',
                            }}
                            //  placeholder={'DD-MM-YYYY'}
                            //  formatDate={fromDate}

                            format={'YYYY-MM-DD'}
                            onDayChange={(dateObj) => {
                                setFromDate(moment(dateObj).format("YYYY-MM-DD"));
                                //  console.log("ddd",moment(dateObj).format("YYYY-MM-DD"))
                            }}
                            style={{ marginTop: "-5px" }}
                        />
                        To Date :
                        <DayPickerInput
                            format={'YYYY-MM-DD'}
                            onDayChange={(dateObj) => {
                                setToDate(moment(dateObj).format("YYYY-MM-DD"));
                                //  console.log("ddd",moment(dateObj).format("YYYY-MM-DD"))
                            }}
                            dayPickerProps={{
                                month: new Date(),
                                showWeekNumbers: true,
                                todayButton: 'Today',
                            }}
                        />
                        <button style={{ width: 80, height: 40, textAlign: "center", padding: 0 }} type="submit" onClick={() => {
                            getData(pageNo, selectedCell === null && isCell ? 1 : 20);

                        }}>Search</button>
                        <span className="popupClose" onClick={closePopup}><span class="material-icons">
                            close
</span></span>
                    </div>
                    <div className="popupMainBlock">
                        {loading ? <Loader /> : <div>
                            {isGraph ? <div>
                                <button style={{ width: "150px", height: "30px", float: "left", padding: 0, marginLeft: "10px", cursor: "pointer" }} onClick={() => {
                                    setIsGraph(false)
                                }}>Back To List</button></div> : null}
                            {isGraph ? <div className="popupTable">
                                <ReactEcharts
                                    option={{
                                        color: ['#00ABDC', '#94BA33', '#003F66', '#e5323e'],
                                        tooltip: {
                                            trigger: 'axis',
                                            axisPointer: {
                                                type: 'shadow'
                                            }
                                        },
                                        legend: {
                                            data: [paramName]
                                        },
                                        toolbox: {
                                            show: true,
                                            orient: 'vertical',
                                            left: 'right',
                                            top: 'center',
                                            feature: {
                                                mark: { show: true },
                                                dataView: { show: false, readOnly: false, title: "Data View" },
                                                magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'], title: { line: "Line", bar: "Bar", stack: "Stack", tiled: "tiled" } },
                                                restore: { show: true, title: "Restore" },
                                                saveAsImage: { show: true, title: "Save Image" },
                                            }
                                        },
                                        xAxis: [
                                            {
                                                type: 'category',
                                                axisTick: { show: false },
                                                data: xAxis,
                                                name: xAxisName
                                            }
                                        ],
                                        yAxis: [
                                            {
                                                type: 'value', name: yAxisName
                                            }
                                        ],
                                        series: [
                                            {
                                                name: paramName,
                                                type: 'bar',
                                                barGap: 0,
                                                //  label: labelOption,
                                                data: yAxis
                                            }
                                        ]
                                    }}
                                    showLoading={false}
                                    style={{ height: '500px', width: '100%' }} />
                            </div> :
                                <div className="popupTable">
                                    {tableData ? <ReactTable
                                        loading={isLoading}
                                        data={tableData}
                                        columns={columns}
                                        defaultPageSize={20}
                                        pageSize={noOfRows}
                                        className="-striped -highlight"
                                        showPaginationBottom={false}
                                        showPaginationTop={false}

                                        pageSizeOptions={[10, 20, 50, 100, 200, 500]}
                                        style={{
                                            height: '100%',
                                            margin: 0
                                            // This will force the table body to overflow and scroll, since there is not enough room
                                        }}
                                        getPaginationProps={() => {
                                            return {
                                                style: { width: "80%" }
                                            }
                                        }}
                                        getTheadThProps={() => {
                                            return {
                                                style: {
                                                    borderRight: null,
                                                    whiteSpace: "pre-wrap",
                                                    backgroundColor: "#009355",
                                                    paddingTop: "18px",
                                                    paddingBottom: "18px",
                                                    //  wordWrap:"break-word",
                                                    fontSize: '14px',
                                                    opacity: 0.7,
                                                    color: "#FFF",
                                                    fontWeight: "bold",
                                                    textAlign: "center"

                                                }
                                            }
                                        }}
                                        getTheadProps={() => {
                                            return {
                                                style: {
                                                    borderRight: null,
                                                }
                                            }
                                        }}
                                        getTdProps={() => {
                                            return {
                                                style: {
                                                    whiteSpace: "pre-wrap",
                                                    wordWrap: "break-word",
                                                    fontSize: '14px',
                                                    opacity: 0.6,
                                                    paddingTop: "10px",
                                                    paddingBottom: "10px",
                                                    borderRight: null,
                                                    textAlign: "center"
                                                    //  backgroundColor:'green'

                                                }
                                            }
                                        }}


                                    /> : null}


                                    {tableData && tableData.length > 0 ?
                                        <div style={{ width: "80%", height: "50px" }}>
                                            <button style={{ width: "10%", height: "35px", padding: 0, marginRight: "10px" }} color={"primary"} onClick={() => {
                                                if (totalPages > 0) {
                                                    if (pageNo - 1 > 0) {
                                                        setPageNo(pageNo - 1)
                                                        getData(pageNo - 1, selectedCell === null ? 1 : noOfRows);
                                                    }
                                                }
                                            }}>Previous</button>

                                            <span>Rows</span>


                                            <select value={noOfRows} onChange={(event) => { setNoOfRows(event.target.value) }}>
                                                {pageSizeOptions.map(prop => {
                                                    return <option>{prop}</option>
                                                })}
                                            </select>

                                            <span>Page  </span>

                                            <input
                                                id="pageIndex"
                                                type={"number"}
                                                value={pageNo}
                                                disabled={true}
                                            />
                                            <span>Of {totalPages}</span>


                                            <button style={{ width: "10%", height: "35px", padding: 0, marginLeft: "10px" }} color={"primary"} onClick={() => {
                                                if (totalPages > 0) {
                                                    if (pageNo < totalPages) {
                                                        setPageNo(pageNo + 1)
                                                        getData(pageNo + 1, selectedCell === null ? 1 : noOfRows);

                                                    }
                                                }
                                            }}>Next</button>


                                        </div> : null}





                                    {excelData && excelData.length > 0 ? <ExportToExcel posts={excelData}
                                        dataTable={{
                                            column: [{
                                                Header: 'Site',
                                                accessor: 'site',
                                            }, { Header: 'Device', accessor: 'device', }, ...columns],
                                            data: excelData
                                        }}
                                        fileName={"Cells"}
                                        sheetName={"Sheet1"} /> : null}
                                    {param !== null ? <div className="img" style={{ float: "right", marginRight: "80px", marginTop: "-60px", cursor: "pointer" }}><IconButton onClick={() => { setIsGraph(true) }}><img width={40} height={40} src={statisticsIcon} /></IconButton></div> : null}




                                    {/*
                                <table >
                                    <tbody><tr>
                                        <th>Cell ID</th>
                                        <th>Cell Name</th>
                                        <th>Cell Status</th>
                                        <th>Communication Status</th>
                                        <th>Voltage</th>
                                        <th>Temperature</th>
                                    </tr>
                                    {tableData && tableData.map((record, index) => {
                                        return <tr key={index} className={"resolved"}>
                                            <td>{record.id}</td>
                                            <td>{record.ctitle}</td>
                                            <td>{record.cellStatus}</td>
                                            <td>{record.comStatus}</td>

                                            <td>{record.value1}</td>
                                            <td>{record.value2}</td>
                                        </tr>
                                    })}
                                    </tbody></table>
*/}
                                </div>}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CellStatsPopup;