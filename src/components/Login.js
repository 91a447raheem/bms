import React, { useState } from 'react';
import {
    IOT_icon,
    UserNameIcon,
    screenBg,
    loginBg
} from "../Assets";
import { requestList } from "../services/server";
import cons, { serverApi } from "../helper/Consts";
import {getCookie, setCookie} from "../helper/Cookies";
import { isUserAuthenticated } from "../helper/isLoggedIn";
import ChangePassword from "./ChangePassword";

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showpassword, setShowpassword] = useState(false)
    const [changePassword, setChangePassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSubmit = () => {
        if (username && password) {
            var data = {
                "userName": username,
                "pwd": password
            };
            requestList(serverApi.LOGIN, data, handleLogin);
            // service call & navigation goesr herei
            //console.log("username and password", username, password)
        } else {
            alert("Username or Password are missing")
        }

    };
    const handleLogin = (resp) => {
        console.log("login resp", resp);
        if (resp.httpStatusCode)
            alert(resp.message);
        else {
            setCookie(cons.UDATA, JSON.stringify(resp));
            setCookie(cons.TOKEN_DATA, resp.token);
            props.history.push("/dashboard")
        }
    };

    const handleChange = (e, variable) => {

        if (variable == "uname") {
            setUsername(e.target.value)
        } else {
            setPassword(e.target.value)
            if (e.target.value) {
                setShowpassword(true)
            }
        }

    }
    const renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            props.history.push("/dashboard")
        }
    };

    const handleVisibility = () => {
        if (password) {
            setShowpassword(!showpassword)
        }

    };
    const handleClickonChangePassword=()=>{
        setLoading(false);
        setChangePassword(!changePassword);
    }

    return (
        <div /*style={{ backgroundImage: "url(" + loginBg + ")", backgroundRepeat: 'repeat-y', float: "left", width: '100%', height: '100vh', backgroundSize: 'cover' }}*/>
            {renderRedirectToRoot()}
            {changePassword ? <ChangePassword  closePopup={handleClickonChangePassword} loading={loading} /> : null}

            <div className="loginformcontainer">

                <div className="imgcontainer">
                    <img src={IOT_icon} alt="Logo" className="siteLogo" />
                </div>
                <div className="usernameblock">
                    <label htmlFor="uname"><b>Username or Email Address</b></label>
                    <div className="inputblock">
                        <input type="text" value={username} placeholder="Enter Username" onChange={(e) => handleChange(e, "uname")} />
                        <span className="symbol-input">
                        {/* <img className="usernameImage" src={UserNameIcon} /> */}
                            <i class="material-icons">
                            person
</i>
                    </span>
                    </div>
                </div>
                <div className="pswblock">
                    <label htmlFor="psw"><b>Password</b></label>
                    <div className="inputblock">
                        <input type={showpassword ? "password" : "text"} value={password} placeholder="**********" onChange={(e) => handleChange(e, "pass")} />
                        <span className="symbol-input" onClick={handleVisibility} style={{ cursor: 'pointer' }}>
                        <i class="material-icons" style={{ marginTop: 10 }}>{showpassword ? "visibility" : "visibility_off"}</i>
                    </span>
                    </div>
                </div>
                <button type="submit" onClick={handleSubmit}>Sign In</button>
                <label style={{ textAlign: 'center', width: '100%' }} >
                    <span className="psw" onClick={()=>{
                        console.log("cc",changePassword)
                        setChangePassword(true)
                    }}> Forgot password?</span>
                </label>
            </div>

        </div>
    )
}

export default Login;