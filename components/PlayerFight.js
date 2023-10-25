import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {socket} from "../App";
import {setTurns, setUser, setWins} from "../features/info";
import {useNavigate} from "react-router-dom";


const PlayerFight = () => {
    const dispatch = useDispatch ()
    const user = useSelector(state => state.info.user)
    const userInfo = useSelector(state => state.info.fight);
    const wins = useSelector(state => state.info.wins);
    const turns = useSelector(state => state.info.turns);
    const turnTime = useSelector(state => state.info.turnTime);
    const nav = useNavigate()



    function hitFunk() {
        socket.emit('hit', userInfo?.roomId);
        dispatch(setTurns(""))
    }
    function backToLobby () {
        console.log(user)
        if (user.username !== wins.username) {
            dispatch(setWins(""))
            return nav ('/lobby')
        }



        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(wins),
        };
        fetch('http://localhost:8000/winGame',options)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setUser(data.data))
                dispatch(setWins(""))
                nav("/lobby")
            });
    }
    function rek( ){
        console.log(userInfo)
    }
    return (
        <div className="d-flex ">
            <div className="d-flex j-center  a-center f-col">
                {wins.win===1 && <div>
                    <p>WIN {userInfo.player1.username}</p>
                    <p>gold: {wins.gold}</p>
                    <button onClick={backToLobby}>Back To Lobby</button>
                </div> }
                {wins.win===2 && <div>
                    <p>WIN {userInfo.player2.username}</p>
                    <p>GOLD: {wins.gold}</p>
                    <button className="backToLobbyBtn" onClick={backToLobby}>Back To Lobby</button>
                </div> }
                {userInfo?.player1?.username === user.username && userInfo.player1.turn &&
                    <div>
                        <h1>Your Turn</h1>
                        <button className="btnHit" onClick={hitFunk}>HIT</button>
                    </div>}
                {userInfo?.player2?.username === user.username && userInfo.player2.turn &&
                    <div>
                        <h1>Your Turn</h1>
                        <button className="btnHit" onClick={hitFunk}>HIT</button>
                    </div>
                }


            </div>

        </div>
    );
};


export default PlayerFight;