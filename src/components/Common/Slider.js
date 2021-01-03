import React from 'react';
import {
    BatteryStatusIcon
} from '../../Assets'
import CarouselSlider from 'react-carousel-slider';

const SliderBlock = () => {

    const itemList = [{
        "title": "Cell Voltage (24)",
        "image": BatteryStatusIcon,
        "subtitle": "normal"
    },
    {
        "title": "String Current",
        "image": BatteryStatusIcon,
        "subtitle": "8 Of 15 Normal"
    },
    {
        "title": "State of change",
        "image": BatteryStatusIcon,
        "subtitle": "Communicating"
    },
    {
        "title": "Battery Status",
        "image": BatteryStatusIcon,
        "subtitle": "15 of Betteries are Charging"
    },
    {
        "title": "String Voltage",
        "image": BatteryStatusIcon,
        "subtitle": "normal"
    },
    {
        "title": "Communication Status",
        "image": BatteryStatusIcon,
        "subtitle": "Communicating"
    },
    {
        "title": "Amblent Temparature",
        "image": BatteryStatusIcon,
        "subtitle": "normal"
    }
    ]

    const handleClick = () => {
        alert("Clicked in Mid Slider")
    }

    let items = itemList.map((item, index) => {
        return (<div className="block" onClick={handleClick}>
            <div className="title">{item.title}</div>
            <div className="images"><img height={70} src={item.image} /></div>
            <div className="subtitle">{item.subtitle}</div>
        </div>)
    }
    );

    // refer this doc for CSS Change https://github.com/Carr1005/react-carousel-slider#accEle

    return (
        <div className="slider">
            <CarouselSlider slideCpnts={items} accEle={{ dots: false }} sliderBoxStyle={{ width: '100%' }} itemsStyle={{ margin: '0px 5px', minWidth: "200px" }} buttonSetting={{ placeOn: 'middle-outside' }} lBtnCpnt={<span class="material-icons">navigate_before</span>} rBtnCpnt={<span class="material-icons">navigate_next</span>} />
        </div>
    );
}

export default SliderBlock;