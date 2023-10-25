import {createSlice} from "@reduxjs/toolkit";

export const infoSlice = createSlice( {
    name:"info",
    initialState: {
        user: [],
        username: "",
        fight: [],
        myInfo: "",
        wins:[],
        turns:"",
        turnTime : 0
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUsername: (state, action) => {
            state.username= action.payload
        },
        setFight: (state, action) => {
            state.fight=action.payload
        },
        setMyInfo: (state, action) => {
            state.myInfo = action.payload
        },
        setWins: (state, action) => {
            state.wins = action.payload
        },
        setTurns: (state, action) => {
            state.turns = action.payload
        },
        setTurnTime: (state, action) => {
            state.turnTime = action.payload
        }

    }
})
export const {setUser,
    setUsername,
    setFight,
    setMyInfo,
    setWins,
    setTurns,
    setTurnTime
} = infoSlice.actions

export default infoSlice.reducer