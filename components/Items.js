import React, {useEffect, useState} from 'react';
import SingleItem from "./singleItem";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../features/info";

const Items = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state=>state.info.user)


    useEffect(()=> {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: localStorage.getItem('token')
            },
        };

        fetch('http://localhost:8000/updateItems',options)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setUser(data.data))
            });
    },[])

    return (
        <div>
            <h1>My Backpack</h1>
            <div className="allItems d-flex">
                { userInfo.items && userInfo.items.map((x,i)=>
                    <SingleItem key={i} index={i} x={x}></SingleItem>
                )}
            </div>
        </div>

    );
};

export default Items;