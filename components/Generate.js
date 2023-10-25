import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {setUser} from "../features/info";
import login from "./Login";


const Generate = () => {

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [generateInfo, setGenerateInfo] = useState([])
    const dispatch = useDispatch ()

    function generateFunk () {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: localStorage.getItem('token')
            },
        };
        fetch('http://localhost:8000/generateGame',options)
            .then((res) => res.json())
            .then((data) => {

                if (data.error) return console.log ("not money")
                setGenerateInfo(data.data[0])
                dispatch(setUser(data.data[1]))

            });
    }
    function takeWeapon () {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: localStorage.getItem('token')
            },
        };
        fetch('http://localhost:8000/takeItems/weapon', options)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.error) return
                dispatch(setUser(data.data))
                const withOut = generateInfo
                withOut.weapon = ""
                setGenerateInfo(withOut)
            });
    }
    function takeArmour () {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: localStorage.getItem('token')
            },
        };

        fetch('http://localhost:8000/takeItems/armour',options)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) return
                dispatch(setUser(data.data))
                const withOut = generateInfo
                withOut.armour = ""
                setGenerateInfo(withOut)
            });
    }
    function takePotion () {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: localStorage.getItem('token')
            },
        };
        fetch('http://localhost:8000/takeItems/potion',options)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) return
                dispatch(setUser(data.data))
                const withOut = generateInfo
                withOut.potion = ""
                setGenerateInfo(withOut)
            });
    }
    return (
        <div>
            <h1>Generate</h1>
            <div className="d-flex generatedItem">
                <div className="flex-1 d-flex">

                    {generateInfo.weapon ?
                        <div

                            style={{backgroundColor: `${generateInfo.weapon.color}` }}
                            className="p-relative"
                            onMouseEnter={() => setShow(true)}
                            onMouseLeave={() => setShow(false)} >
                            <img src={generateInfo.weapon.weaponUrl} alt=""/>
                            <div>
                                <button onClick={takeWeapon}>Take</button>
                            </div>
                            {
                                show && <div className="fieldInfo d-flex f-col">
                                    <b>WEAPON</b>
                                    <span>Weapon Level: {generateInfo.weapon.weaponLevel}</span>
                                    <span>Power: {generateInfo.weapon.weaponPower}</span>
                                    <span>Gold: {generateInfo.weapon.gold}</span>
                                    <span>Block Chance: {generateInfo.weapon.blockChance}</span>
                                    <span>Double Damage Chance: {generateInfo.weapon.doubleChance}</span>
                                    <span>Steal Hp Chance: {generateInfo.weapon.stealChance}</span>
                                </div>
                            }
                        </div>


                        : <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS72dWqk0OsJ5fgETWKwr5sVezmCaEbGrebMw&usqp=CAUg" alt=""/></div>}
                </div>
                <div className="flex-1 d-flex">



                    {generateInfo.armour ?
                        <div
                            className="p-relative"
                            style={{backgroundColor: `${generateInfo.armour.color}`}}
                            onMouseEnter={() => setShow1(true)}
                            onMouseLeave={() => setShow1(false)}
                        >
                            <img src={generateInfo.armour.armourUrl} alt=""/>
                            <div>
                                <button onClick={takeArmour}>Take</button>
                            </div>
                            {
                                show1 && <div className="fieldInfo d-flex f-col">
                                    <b>WEAPON</b>
                                    <span>Armour Level: {generateInfo.armour.armourLevel}</span>
                                    <span>Defence: {generateInfo.armour.armourPower}</span>
                                    <span>Block Chance: {generateInfo.armour.blockChance}</span>
                                    <span>Double Damage Chance: {generateInfo.armour.doubleChance}</span>
                                    <span>Steal Hp Chance: {generateInfo.armour.stealChance}</span>
                                </div>
                            }

                        </div>:
                        <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS72dWqk0OsJ5fgETWKwr5sVezmCaEbGrebMw&usqp=CAUg" alt=""/></div>
                    }



                </div>
                <div className="flex-1 d-flex">
                    {generateInfo.potion ?
                        <div
                            className="p-relative"
                            style={{backgroundColor: "#7a88a8"}}
                            onMouseEnter={() => setShow2(true)}
                            onMouseLeave={() => setShow2(false)}
                        >
                            <img src={generateInfo.potion.potionUrl} alt=""/>
                            <div>
                                <button onClick={takePotion}>Take</button>
                            </div>
                            {
                                show2 && <div className="fieldInfo d-flex f-col">
                                    <b>POTION</b>
                                    <span>Potion: {generateInfo.potion.potion}</span>
                                </div>
                            }


                        </div>:
                        <div><img src="https://media.istockphoto.com/id/683722110/photo/artificial-flowers-inside-vase.jpg?s=612x612&w=0&k=20&c=T9ypTzSToa5NSDJWH3eQqfmPOonrIjEh4LgQLY2DD24=" alt=""/></div>
                    }
                </div>
            </div>
            <button onClick={generateFunk} >Generate 50$</button>
        </div>
    );
};

export default Generate;