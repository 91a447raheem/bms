import React, { useState } from 'react';
import { Popper, ClickAwayListener, Grow, Paper, Menu, MenuItem } from '@material-ui/core';
import { removeCookies } from "../../helper/Cookies";
import logo from "../../Assets/vajra-logo_png.png"
import NotificationsPopup from "../NotificationsPopup";

const Header = (props) => {
    const notifications = props.notifications;
    const [anchorEl, open] = React.useState(null);
    const [notifStats, setNotifStats] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClickonnotifications = () => {
        // Once after service call we need to fetch the stop the loader
        setLoading(false);
        setNotifStats(!notifStats)
    };

    const handleClick = event => {
        open(event.currentTarget);
    };

    const handleClose = () => {
        open(null);
    };
    return (<header>
        <div className="headerBlock">
            <div className="container-fluid">
                <div className="logo_block"><img src={logo} width={90} height={40} /><span style={{ marginLeft: "15px", fontWeight: "bold" }}></span></div>
                <div className="header_mid">BATTERY MANAGEMENT SYSTEM</div>
                <div className="right_block header_right">
                    <div className="site_selection">
                        <select class="site_selection_options">
                            <option selected={true}>Battery Management System</option>
                            <option>Aqua Thantra</option>
                        </select>
                    </div>
                    <div className="notificationIcon">
                        <i className="fa fa-bell" aria-hidden="true" style={{ cursor: "pointer" }} onClick={() => {
                            if (notifications) {
                                handleClickonnotifications();
                            }
                        }} />
                    </div>
                    <div className="userProfile" onClick={handleClick}>
                        <span>VJ</span>
                    </div>
                    <Menu
                        id="Menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        className="menuDropdown"
                    >
                        <MenuItem onClick={() => {
                            open(null);

                        }}>My Profile</MenuItem>
                        <MenuItem onClick={() => {
                            open(null);

                        }}>Change Password</MenuItem>
                        <MenuItem onClick={() => {
                            open(null);

                        }}>Cpanel</MenuItem>

                        <MenuItem onClick={() => {
                            open(null);
                            removeCookies();
                            props.redirect();
                            //  window.location.reload();

                        }}>Logout</MenuItem>
                    </Menu>
                </div>

            </div>

        </div>
        {notifStats ? <NotificationsPopup dataResponse={notifications.length > 0 ? notifications : []} closePopup={handleClickonnotifications} loading={loading} /> : null}

    </header>);
}

export default Header;