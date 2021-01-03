import React from 'react';

const Header = () => {
    return (<header>
        <div className="headerBlock">
            <div className="container">
                <div className="logo_block"><a href="#"><b>BMS</b> Battery Management System</a></div>
                <div className="right_block">
                    <div className="notificationIcon">
                        <i className="fa fa-bell" aria-hidden="true" />
                    </div>
                    <div className="userProfile">
                        <span>VJ</span>
                    </div>
                </div>
            </div>
        </div>
    </header>);
}

export default Header;