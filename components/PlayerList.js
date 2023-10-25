import React, {useEffect, useState} from 'react';
import PlayerOnline from "./PlayerOnline";
import {useDispatch, useSelector} from "react-redux";

const PlayerList = () => {
    const [userInfo, setUserInfo] = useState([]);
    const dispatch = useDispatch();
    const users = useSelector(state => state.info.username);
    const thisUserInfo = useSelector(state => state.info.myInfo);

    useEffect(() => {
        if (Array.isArray(users)) {
            const filteredUsers = users.filter(x => x.username !== thisUserInfo.username);
            setUserInfo(filteredUsers);
        }
    }, [users, thisUserInfo]);

    return (
        <div className="d-flex f-col a-center">
            <h1>Online Players</h1>
            {userInfo && userInfo.map((x, i) => <PlayerOnline key={i} x={x}></PlayerOnline>)}
        </div>
    );
};

export default PlayerList;