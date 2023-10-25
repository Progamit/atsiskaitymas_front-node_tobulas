import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../features/info";



const SingleItem = ({x, index}) => {
    const [show, setShow] = useState(false);
    const userInfo = useSelector(state=>state.info.user)
    const dispatch = useDispatch ()
    function takeToFight () {
        const user = {
            index: index,
            name: x.name
        }

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(user),
        };

        fetch('http://localhost:8000/updateFightItem',options)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setUser(data.data))
            });
    }
    function removeItem () {
        const user = {
            index: index,
            name: x.name
        }
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(user),
        };

        fetch('http://localhost:8000/removeItem',options)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setUser(data.data))
            });
    }

    return (

        <div className="p-relative" >
            {x && x.name &&  (
                <div
                    className="myItems" style={{backgroundColor:x.color}}
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}
                >
                    {x.name === 'weapon' && (
                        <div>
                            <img src={x.weaponUrl} alt="" />
                            <button onClick={takeToFight}>Take To Fight</button>
                            <button onClick={removeItem}>Remove Item</button>


                            {
                                show && <div className="fieldInfo2 d-flex f-col">
                                    <b>WEAPON</b>
                                    <span>Weapon Level: {x.weaponLevel}</span>
                                    <span>Power: {x.weaponPower}</span>
                                    <span>Gold: {x.gold}</span>
                                    <span>Block Chance: {x.blockChance}</span>
                                    <span>Double Damage Chance: {x.doubleChance}</span>
                                    <span>Steal Hp Chance: {x.stealChance}</span>
                                </div>
                            }

                        </div>
                    )}
                    {x.name === 'armour' && (
                        <div >
                            <img src={x.armourUrl} alt="" />
                            <button onClick={takeToFight}>Take To Fight</button>
                            <button onClick={removeItem}>Remove Item</button>

                            {
                                show && <div className="fieldInfo2 d-flex f-col">
                                    <b>ARMOUR</b>
                                    <span>Armour Level: {x.armourLevel}</span>
                                    <span>Defence: {x.armourPower}</span>
                                    <span>Block Chance: {x.blockChance}</span>
                                    <span>Double Damage Chance: {x.doubleChance}</span>
                                    <span>Steal Hp Chance: {x.stealChance}</span>
                                </div>
                            }

                        </div>
                    )}
                    {x.name === 'potion'  && (
                        <div>
                            <img src={x.potionUrl} alt="" />
                            <button onClick={takeToFight}>Take To Fight</button>
                            <button onClick={removeItem}>Remove Item</button>
                            {
                                show && <div className="fieldInfo2 d-flex f-col">
                                    <b>POTION</b>
                                    <span>Potion: {x.potion}</span>
                                </div>
                            }
                        </div>
                    )}



                </div>
            )}
        </div>
    );
};

export default SingleItem;