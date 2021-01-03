import React from 'react';
import {
    IOT_icon,
    UserNameIcon
} from "../Assets";

const Login = () => {

    return (<div className="container">
        <div className="loginformcontainer">
            <div className="imgcontainer">
                <img src={IOT_icon} alt="Logo" className="siteLogo" />
            </div>
            <div className="usernameblock">
                <label htmlFor="uname"><b>Username or Email Address</b></label>
                <div className="inputblock">
                    <input type="text" placeholder="Enter Username" name="uname" required />
                    <span className="symbol-input">
                        <img className="usernameImage" src={UserNameIcon} />
                    </span>
                </div>
            </div>
            <div className="pswblock">
                <label htmlFor="psw"><b>Password</b></label>
                <div className="inputblock">
                    <input type="password" placeholder="**********" name="psw" required />
                    <span className="symbol-input">
                        <i className="fa fa-lock" aria-hidden="true" />
                    </span>
                </div>
            </div>
            <button type="submit">Sign In</button>
            <label>
                <span className="psw"> <a href="#">Forgot password?</a></span>
            </label>
        </div>
    </div>
    )
}

export default Login;