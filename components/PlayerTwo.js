import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setFight} from "../features/info";
import {socket} from "../App";

const PlayerTwo = () => {
    const dispatch = useDispatch ()
    const userInfo = useSelector(state=>state.info.fight.player2)
    let user = useSelector(state=>state.info.fight)


    function potionUse () {

        socket.emit ("potion", user.roomId, 2)
    }
    return (
        <div className="playerOne">
            {userInfo && <div>
                <h1>{userInfo.username}</h1>
                <p></p>
                <img src={userInfo.avatar} alt=""/>
                <div className="progressBar">
                    { userInfo.hp && userInfo.hp >= 0 &&
                        <div style={{ width: `${userInfo.hp}%` }}></div>
                    }
                </div>
                <div className="itemsInFight d-flex">
                    {!userInfo.potionUse && userInfo?.potion?.[0]?.potionUrl ?
                        <div onClick={potionUse}>
                            <img src={userInfo?.potion?.[0]?.potionUrl ?? "https://media.istockphoto.com/id/683722110/photo/artificial-flowers-inside-vase.jpg?s=612x612&w=0&k=20&c=T9ypTzSToa5NSDJWH3eQqfmPOonrIjEh4LgQLY2DD24="} alt=""/>
                        </div>: <img src="https://media.istockphoto.com/id/683722110/photo/artificial-flowers-inside-vase.jpg?s=612x612&w=0&k=20&c=T9ypTzSToa5NSDJWH3eQqfmPOonrIjEh4LgQLY2DD24=" alt=""/>}
                </div>
                <div className="d-flex flex-1">

                </div>
            </div>}
        </div>
    );
};

export default PlayerTwo;