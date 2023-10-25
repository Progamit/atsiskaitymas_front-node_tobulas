import React, {useEffect, useRef, useState} from 'react';
import Avatars from "./Avatars";
import {useFetcher, useNavigate} from "react-router-dom";


const Register = ({setLoginOrRegister,setWindow}) => {
    const [selectAvatar, setSelectAvatar] = useState()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const password2Ref = useRef()
    const [avatars, setAvatars] = useState()
    const [error, setError] = useState("")
    const nav = useNavigate()

    useEffect(()=> {
        fetch('http://localhost:8000/avatars')
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data)
                setAvatars(data.data)
            });
        console.log("1")

    },[])

    function register () {
        console.log("register")
        const user = {
            avatar: selectAvatar,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            password2: password2Ref.current.value
        }
        if(!user.avatar) return setError("no avatar")
        if(user.username.length < 3) return setError("username too short")
        if (user.password.length < 3) return setError("password too short")
        if (user.password!==user.password2) return setError("password don`t match")

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        };
        fetch('http://localhost:8000/register', options)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) return setError(data.message)
                setLoginOrRegister(0)
                console.log(data)
            });
    }

    return (
        <div className="d-flex f-col login register">
            <div className="d-flex avatars">
                {avatars && avatars.map((x,i)=> <div key={i}>
                    <Avatars x={x} i={i} setSelectAvatar={setSelectAvatar} selectAvatar={selectAvatar}/>
                </div>  )}
            </div>
            <div>
                <input type="text" placeholder="username" ref={usernameRef}/>
            </div>
            <div>
                <input type="text" placeholder="password" ref={passwordRef}/>
            </div>
            <div>
                <input type="text" placeholder="password2" ref={password2Ref}/>
            </div>
            <div>
                {error && <div style={{color:"red"}}> {error}</div>}
                <button onClick={register}>Register</button>
            </div>
        </div>
    );
};

export default Register;