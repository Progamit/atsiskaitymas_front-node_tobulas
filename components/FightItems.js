import React from 'react';
import {useSelector} from "react-redux";


const FightItems = () => {
    const userInfo = useSelector(state=>state.info.user)


    return (
        <div className=" d-flex f-col weaponToFight">
            <h1>Items to fight</h1>
            <div className="d-flex j-space-around">
                <div>
                    {userInfo && userInfo.potion && userInfo.weapon.length>0  && (
                        <img src={userInfo.weapon[0].weaponUrl} alt="" />
                    )}
                </div>
                <div>
                    {userInfo && userInfo.potion && userInfo.armour.length>0 && (
                        <img src={userInfo.armour[0].armourUrl} alt="" />
                    )}
                </div>
                <div>
                    {userInfo && userInfo.potion && userInfo.potion.length>0 && (
                        <img src={userInfo.potion[0].potionUrl} alt="" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default FightItems;