import React, {useEffect} from 'react';
import Generate from "../components/Generate";
import Items from "../components/Items";
import PlayerList from "../components/PlayerList";
import FightItems from "../components/FightItems";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../features/info";
import {useNavigate} from "react-router-dom";
import {socket} from "../App";

const LobbyPage = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state=>state.info.user)
    const nav = useNavigate()
    function logOut () {
        localStorage.setItem("token", (""));
        dispatch(setUser(""))
        nav("/")
    }
    return (
        <div className="container2 d-flex f-col">
            <div className="d-flex userInfo">
                <div className="d-flex flex-1 j-space-between">
                    <p>Username: {userInfo && userInfo.username}</p>
                    <p> Money: {userInfo && userInfo.money}$</p>
                    <p> Dragon Balls: 0</p>
                </div>
                <div className=" d-flex flex-1 j-end">
                    <p><button onClick={logOut}>Log Out</button></p>
                </div>


            </div>
            <div className="d-flex">

                <div className="flex-1 left">
                    <div className="d-flex j-center">
                        <Generate></Generate>
                    </div>
                    <div className="d-flex j-center">
                        <Items></Items>
                    </div>
                </div>

                <div className="flex-1 right d-flex f-col ">

                    <FightItems></FightItems>

                    <PlayerList></PlayerList>


                </div>
            </div>
        </div>
    );
};

export default LobbyPage;