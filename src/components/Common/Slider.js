import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import {
    BatteryStatusIcon
} from '../../Assets'

const SliderBlock = () => {
    const [activeItemIndex, changeActiveItem] = useState(2)

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

    const handleClick = (index) => {
        console.log("Clicked in Mid Slider", index)
        changeActiveItem(index)
    }

    let activeItem = activeItemIndex + 2
    console.log("activeItem", activeItem, activeItemIndex)
    // refer this doc for CSS Change https://github.com/Carr1005/react-carousel-slider#accEle

    return (
        <ItemsCarousel
            // Placeholder configurations
            enablePlaceholder
            // Carousel configurations
            numberOfCards={5}
            gutter={12}
            showSlither={true}
            firstAndLastGutter={true}
            freeScrolling={true}

            // Active item configurations
            requestToChangeActive={changeActiveItem}
            activeItemIndex={activeItemIndex}
            activePosition={'center'}
            // infiniteLoop={true}
            chevronWidth={24}
            rightChevron={<span class="material-icons">navigate_next</span>}
            leftChevron={<span class="material-icons">navigate_before</span>}
            outsideChevron={true}
            alwaysShowChevrons={true}
            slidesToScroll={1}
        >
            {itemList.map((item, index) => {
                return (<div className="SingleSlide"><div className={activeItemIndex == index ? "block activeSlide" : "block"} onClick={() => handleClick(index)}>
                    <div className="title">{item.title}</div>
                    <div className="images"><img height={70} src={item.image} /></div>
                    <div className="subtitle">{item.subtitle}</div>
                </div></div>)
            })}
        </ItemsCarousel>
    );
}

export default SliderBlock;