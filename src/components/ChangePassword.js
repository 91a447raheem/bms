import React, {useState} from 'react';
import { Loader } from './Common'
import {getDataFromUrl} from "../services/server";
import {serverApi} from "../helper/Consts";

const ChangePassword = (props) => {
    const { closePopup, dataResponse, loading,site,device } = props;
    const [username, setUsername] = useState('')
    const handleChange = (e) => {

            setUsername(e.target.value)

    };
    const handleResp=(resp)=>{
        var txt;
        if (r === true) {
            closePopup()
        } else {
            var r = alert(resp.message);
        }
    };

    return (
        <div className="changePasswordpopupBlockContainer">
            <div className="changePasswordBlockContainer">
                <div className="popupBlock">
                    <div className="popupHeader"  onClick={closePopup}>
                        <div  style={{color:"red",marginLeft:"10px",fontSize:"18px"}}>Change Password

                            <span className="popupClose"><span className="material-icons">
                            close
</span></span>

                        </div>
                    </div>

                    <div className="popupPasswordMainBlock" >
                        {loading ? <Loader /> : <div>

                                    <div className="usernameblock">
                                        <label htmlFor="uname"><b>User Id</b></label>
                                        <div className="inputblock">
                                            <input type="text" placeholder="Enter Username"  onChange={handleChange}
                                                 />
                                            <span className="symbol-input">
                        {/* <img className="usernameImage" src={UserNameIcon} /> */}
                                                <i className="material-icons">
                            email
</i>
                    </span>

                                </div>

                            </div>

                        </div>}
                        <button style={{width:"100px",float:"right",backgroundColor:"red"}} type="submit" onClick={()=>{
                            if(username!==""){
                                getDataFromUrl(serverApi.FORGOT_PASSWORD+username,handleResp)
                            }else
                            alert("Please Enter User Id..!!");
                        }}>Submit</button>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default ChangePassword;