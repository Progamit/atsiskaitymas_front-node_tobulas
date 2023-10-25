import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Tasks-mano-darbai-reaktas/zaidimas-kova-react/App.js'
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import infoReducer from "./features/info"
import {Provider} from "react-redux";


const store = configureStore({
    reducer: {
        info: infoReducer
    }
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)