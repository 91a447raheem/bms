import React, { useState } from 'react';
import {
    IOT_icon,
    UserNameIcon
} from "../Assets";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        if (username && password) {
            // service call & navigation goes here
            console.log("username and password", username, password)
        } else {
            alert("Username or Password are missing")
        }

    }

    const handleChange = (e, variable) => {

        if (variable == "uname") {
            setUsername(e.target.value)
        } else {
            setPassword(e.target.value)
        }

    }

    return (<div className="container">
        <div className="loginformcontainer">
            <div className="imgcontainer">
                <img src={IOT_icon} alt="Logo" className="siteLogo" />
            </div>
            <div className="usernameblock">
                <label htmlFor="uname"><b>Username or Email Address</b></label>
                <div className="inputblock">
                    <input type="text" value={username} placeholder="Enter Username" onChange={(e) => handleChange(e, "uname")} />
                    <span className="symbol-input">
                        <img className="usernameImage" src={UserNameIcon} />
                    </span>
                </div>
            </div>
            <div className="pswblock">
                <label htmlFor="psw"><b>Password</b></label>
                <div className="inputblock">
                    <input type="password" value={password} placeholder="**********" onChange={(e) => handleChange(e, "pass")} />
                    <span className="symbol-input">
                        <i className="fa fa-lock" aria-hidden="true" />
                    </span>
                </div>
            </div>
            <button type="submit" onClick={handleSubmit}>Sign In</button>
            <label style={{ textAlign: 'center', width: '100%' }}>
                <span className="psw"> <a href="#">Forgot password?</a></span>
            </label>
        </div>
    </div>
    )
}

export default Login;