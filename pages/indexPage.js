import React, {useEffect, useState} from 'react';
import Login from "../components/Login";
import Register from "../components/Register";

const IndexPage = () => {
    const [window, setWindow] = useState()

    useEffect(()=> {
        if (localStorage.getItem("token")&& localStorage.getItem("token")!=="" )
        {
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    "authorization": localStorage.getItem("token")
                },
            };
            fetch('http://localhost:8000/autoLogin',options)
                .then((res) => res.json())
                .then((data) => {
                });
            setWindow(2)
        } else {
            return  setWindow(1)
        }
    },[window])


    const [loginOrRegister, setLoginOrRegister] = useState(0)
    return (




        <div className="container">
            {window===1 && <div>
                <button className="btnIndex" style={{backgroundColor: loginOrRegister===0 ? "green" : "darkgray"}} onClick={()=>{setLoginOrRegister(0)}}>Login</button>
                <button className="btnIndex" style={{backgroundColor: loginOrRegister===1 ? "green" : "darkgray"}} onClick={()=>{setLoginOrRegister(1)}}>Register</button>
            </div> }

            {loginOrRegister===0 &&
                <div>
                    <Login  setWindow2={setWindow}></Login>
                </div>}
            {loginOrRegister===1 &&
                <div>
                    <Register  setLoginOrRegister={setLoginOrRegister}></Register>
                </div>}
        </div>
    );
};

export default IndexPage;