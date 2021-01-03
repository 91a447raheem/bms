import React from 'react';
import {
    BatteryStatusIcon
} from '../../Assets'
import CarouselSlider from 'react-carousel-slider';

const SliderBlock = () => {

    const itemList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const handleClick = () => {
        alert("Clicked in Mid Slider")
    }

    let items = itemList.map((item, index) => {
        return (<div className="block" onClick={handleClick}>
            <div className="title">Cell Voltage (24)</div>
            <div className="images"><img src={BatteryStatusIcon} /></div>
            <div className="subtitle">normal</div>
        </div>)
    }
    );

    // refer this doc for CSS Change https://github.com/Carr1005/react-carousel-slider#accEle

    return (
        <div className="slider">
            <CarouselSlider slideCpnts={items} accEle={{ dots: false }} />
        </div>
    );
}

export default SliderBlock;