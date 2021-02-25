import React from 'react';
import {
    batteryCharging
} from '../../Assets'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CHARTCONFIG from "../ReactECharts/ChartConfig";
import ReactEcharts from "../ReactECharts";
import {returnActioncls} from "../../utils";
const TabsList = (props) => {
    var data1=[],tableData=[];
    if(props.data.data)
    props.data.data.forEach((prop,i)=>{
        if(i<10){
            data1.push( [prop.title, props.data.title,prop.value])
            tableData.push({id:prop.id,cellName:prop.title,voltage:prop.subtitle,status:prop.status})
        }
    });
    var resp={
        "data": {
        "cols": [
            "Title",
            props.data.title,
            "Value"
        ],
            "data": data1
    },
        "status": true,
        "msg": "Success"
    };
    var option={};
    var labelOption = {
        show: true,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
            name: {
                textBorderColor: '#fff'
            }
        }
    };


    if(resp.status===true){
        var xAxis=[],legendData=[];
        resp.data.data.forEach((prop,i)=>{
            if(i===0){
                xAxis.push(prop[0]);
                legendData.push(prop[1])
            }else {
                xAxis.forEach(p=>{
                    if(!(xAxis.indexOf(prop[0]) > -1))
                        xAxis.push(prop[0])
                });
                legendData.forEach(p=>{
                    if(!(legendData.indexOf(prop[1]) > -1))
                        legendData.push(prop[1])
                })
            }


        });
        var series=[];
        legendData.forEach((l,i)=>{
            var data1=[];
            xAxis.forEach((m,k)=>{
                data1.push(0);
                resp.data.data.forEach(prop=>{
                    if(m===prop[0]&&l===prop[1]){
                        data1[k]=prop[2]
                    }
                });

            });
            var obj= {
                name:l,
                type: 'bar',
                barGap: 0,
                label: labelOption,
                data: data1
            }
            series.push(obj)
        });

        option={
            color: ['#4caf50','#94BA33','#003F66', '#e5323e','#ff9800','#e91e63'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data:legendData
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: {show: true},
                    dataView: {show: false, readOnly: false,title:"Data View"},
                    magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled'],title:{ line:"Line" , bar:"Bar" , stack:"Stack" , tiled:"tiled" }},
                    restore: {show: true,title:"Restore"},
                    saveAsImage: {show: true,title:"Save Image"},
                }
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data:xAxis
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    nameTextStyle:{
                        // fontWeight:400,
                        // fontSize:12,
                        shadowColor:"#000000",
                        padding:0
                    },
                    axisLabel: {
                        textStyle: {
                            color: CHARTCONFIG.color.text
                        },
                        fontSize:7,
                        //formatter: '{value} K'

                    }
                }
            ],
            series:series
        }
    }
    return (
        <React.Fragment>
            <div className="title">{props.data.title}</div>
            <div className="subtitle">Summary of all information</div>
            <div className="tabbed-area">
                <Tabs>
                    <TabList>
                        <Tab>Pictorial</Tab>
                        <Tab>Graphical</Tab>
                        <Tab>Tabular</Tab>
                    </TabList>

                    <TabPanel>
{/*
                        <div className="borderImage"><img src={batteryCharging} /></div>
*/}

                            <div className="popupTable" style={{maxHeight:200,overflowY:'auto'}}>
                                {props.data.data && props.data.data.map((record, index) => {
                                    return <div className="betteryBlock" key={index}>
                                        <div className="betteryStatusImage"><img src={record.iconUrl} /></div>
                                        <div className="betteryInformation">
                                            <div className="betteryname" >{record.title}</div>
                                            <div className="betteryinfo">{record.subtitle}{/*<sup>0</sup>C*/}</div>
                                        </div>
{/*
                                        {index===Index?<div style={tooltipStyle}>{record.title}<br/>{record.subtitle}</div>:null}
*/}
                                    </div>
                                })}
                            </div>

{/*
                            <div className="title">{props.data.summary}</div>
*/}
{/*
                            <div className="sitesSubtitle">{props.data.subtitle}</div>
*/}
{/*
                            <div className="numberRightBlock">

                                <div className="title">{props.data}</div>


                                <div className="sitesSubtitle">Charging Status</div>

                            </div>
*/}

                    </TabPanel>
                    <TabPanel>

                            <ReactEcharts
                                option={option}
                                showLoading={false}/>


                           {/* <div className="number">25%</div>
                            <div className="numberRightBlock">
                                <div className="title">Mid Graphical</div>
                                <div className="sitesSubtitle">Charging Status</div>
                            </div>*/}

                    </TabPanel>
                    <TabPanel>
                        <div className="popupTable" style={{maxHeight:220,overflowY:'scroll',overflowX:'hidden'}}>
                        <table >
                            <tbody><tr>
                                <th>ID</th>
                                <th>Cell</th>
                                <th>Voltage</th>
                                <th>Status</th>
                            </tr>
                            {tableData && tableData.map((record, index) => {
                                return <tr key={index} className={"resolved"}>
                                    <td>{record.id}</td>
                                    <td>{record.cellName}</td>
                                    <td>{record.voltage}</td>
                                    <td>{record.status}</td>
                                </tr>
                            })}
                            </tbody></table>

                        {/*<div className="block">
                            <div className="number">25%</div>
                            <div className="numberRightBlock">
                                <div className="title">Mid Tabular</div>
                                <div className="sitesSubtitle">Charging Status</div>
                            </div>
                        </div>*/}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </React.Fragment>);
}

export default TabsList;