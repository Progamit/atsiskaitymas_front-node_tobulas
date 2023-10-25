import React, {useEffect, useState} from 'react';
import Player0Ne from "../components/PlayerONe";
import PlayerTwo from "../components/PlayerTwo";
import PlayerFight from "../components/PlayerFight";
import {socket} from "../App";
import { useLocation } from 'react-router-dom';

const GamePage = () => {


    return (
        <div className="d-flex container f-col">
            <div className="d-flex gamePage">
                <div className="d-flex flex-1 j-center">
                    <Player0Ne></Player0Ne>
                </div>
                <div className="flex-1 fightFieldCenter">
                    <PlayerFight></PlayerFight>
                </div>
                <div className="flex-1 d-flex j-center">
                    <PlayerTwo></PlayerTwo>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
