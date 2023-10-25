import React from 'react';
import {socket} from "../App";
import {useNavigate} from "react-router-dom";


const Modal = ({request, answer, setRequest}) => {
    const nav = useNavigate()

    function yesFunk () {
        console.log("accept")
        socket.emit('accept_fight', request.socketId);
        nav("/game");
        setRequest(null)
    }
    function noFunk () {
        socket.emit('decline_fight', request.id);
        setRequest(null)
    }
    return (
        <div>
            {request &&
                <div className="requestModal">
                    <div>{request.username} wants to play with you</div>
                    <div>
                        <button onClick={yesFunk}>YES</button> <button onClick={noFunk}>No</button>
                    </div>
                </div>}
        </div>
    );
};

export default Modal;