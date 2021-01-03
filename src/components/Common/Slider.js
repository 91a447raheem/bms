import React from 'react';
import {
    BatteryStatusIcon,
    voltageIcon,
    stringContnentIcon,
    communicationIcon,
    normalstatusIcon,
    communicationactiveIcon,
    temparatureIcon
} from '../../Assets'
import CarouselSlider from 'react-carousel-slider';

const SliderBlock = () => {

    const itemList =  [{
        "title":"Cell Voltage (24)",
        "image":voltageIcon,
        "subtitle":"normal"
        },
        {
        "title":"String Current",
        "image":stringContnentIcon,
        "subtitle":"8 Of 15 Normal"
        },
        {
            "title":"State of change",
            "image":communicationIcon,
            "subtitle":"Communicating"
        },
        {
            "title":"Battery Status",
            "image":BatteryStatusIcon,
            "subtitle":"15 of Betteries are Charging"
        },
        {
            "title":"String Voltage",
            "image":normalstatusIcon,
            "subtitle":"normal"
        },
        {
            "title":"Communication Status",
            "image":communicationactiveIcon,
            "subtitle":"Communicating"
        },
        {
            "title":"Amblent Temparature",
            "image":temparatureIcon,
            "subtitle":"normal"
        }
    ]

    const handleClick = () => {
        alert("Clicked in Mid Slider")
    }

    let items = itemList.map((item, index) => {
        return (<div className="block" onClick={handleClick}>
            <div className="title">{item.title}</div>
            <div className="images"><img src={item.image} /></div>
            <div className="subtitle">{item.subtitle}</div>
        </div>)
    }
    );

    // refer this doc for CSS Change https://github.com/Carr1005/react-carousel-slider#accEle

    return (
        <div className="slider">
            <CarouselSlider slideCpnts={items} accEle={{ dots: false }} sliderBoxStyle={{ width: '100%' }} itemsStyle={{ margin: '0px 5px', minWidth: 200 }} buttonSetting={{ placeOn: 'middle-outside' }} lBtnCpnt={<span class="material-icons">navigate_before</span>} rBtnCpnt={<span class="material-icons">navigate_next</span>} />
        </div>
    );
}

export default SliderBlock;