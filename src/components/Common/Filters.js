import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const Filters = () => {
    return (<div className="fliterOptions">
        <div className="container">
            <ul>
                <li>
                    <div className="Icon"><i className="fa fa-filter" aria-hidden="true" /></div>
                    <select className="siteOptions">
                        <option>Madhapur site</option>
                        <option>Ameerpet site</option>
                    </select>
                </li>
                <li>
                    <select>
                        <option>VJ0021534</option>
                    </select>
                </li>
                <li>
                    <div className="date"><DayPickerInput /> <div className="calendarIcon"><i className="fa fa-calendar" aria-hidden="true" /></div></div>
                </li>
            </ul>
        </div>
    </div>
    );
}

export default Filters;