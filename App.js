import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import IndexPage from "./pages/indexPage";
import GamePage from "./pages/gamePage";
import LobbyPage from "./pages/lobbyPage";
import "./App.css"
import { io } from "socket.io-client";
import {setFight, setUsername, setMyInfo, setWins, setTurns,setTurnTime} from "./features/info";
import {useDispatch, useSelector} from "react-redux";
import Modal from "./components/Modal";


export const socket = io("http://localhost:3001", {
    autoConnect: true
});
const App = () => {
    const dispatch = useDispatch ()
    const nav = useNavigate()
    const timeLeft = useSelector (state=> state.info.turnTime)
    const [request, setRequest] = useState()
    const [requestAnswer, setRequestAnswer] = useState()

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
        }
    },[])
    useEffect(()=> {
        let infoToken = localStorage.getItem("token")
        if (!infoToken) return
        socket.on('connect', (userInfo) => {
            socket.emit("token", infoToken)
        });
    },[])

    useEffect(() => {
        socket.on('login', (val, val2) => {
            dispatch(setUsername(val))

        }, []);
    }, []);

    useEffect(() => {
        socket.on('login2', (data) => {
            dispatch(setMyInfo(data))
        });
        return () => {
            socket.off('login2');
        };
    }, []);





    useEffect(()=> {
        socket.on('fight_request', (data) => {
            console.log(data.from)
            setRequest(data.from)

        });
    },[])
    useEffect(() => {
        console.log("accepted")
        socket.on('fight_accepted', (data) => {
            nav("/game");
        });
    }, []);

    useEffect(() => {
        console.log("fight cencel")
        socket.on('fight_declined', (data) => {
            alert(`${data.opponent} declined your fight request.`);
            console.log(data.opponent.username)
        });
    }, []);

    useEffect(() => {
        console.log("start game")
        socket.on('start_game', (data) => {
            nav("/game", { state: { roomId: data.roomId } });
            console.log(data)
        });
    }, []);
    useEffect(() => {
        console.log("room create")
        socket.on('room_created', (data) => {
            console.log("Room Data:", data);
            dispatch(setFight(data))
        });
    }, []);
    useEffect(() => {
        socket.on('update_players', (data) => {
            console.log("Updated Player Data:", data);
            dispatch(setFight(data))
        });
    }, []);
    useEffect(() => {
        socket.on('wins',(data) => {
            dispatch(setWins(data))
        })
    },[])
    useEffect(() => {
        socket.on('playerTurn', (data) => {
            dispatch(setTurns(data))
        })
    },[])
    useEffect(()=> {
        socket.on('turnTime', (data) => {
            console.log(data)
            dispatch(setTurnTime(data))
        })
    },[])



    function timer() {
        if (timeLeft > 0) {
            dispatch(setTurnTime(timeLeft - 1));
        }
    }

    useEffect(() => {
        const intervalId = setInterval(timer, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="body">
            <Routes>
                <Route path="/" element={<IndexPage/>}/>
                <Route path="/game" element={<GamePage/>}/>
                <Route path="/lobby" element={<LobbyPage/>}/>
            </Routes>
            <div className="modal"><Modal request={request} setRequest={setRequest} answer={setRequestAnswer}></Modal></div>
        </div>
    );
};

export default App;