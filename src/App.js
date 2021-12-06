import './App.css';
import React, {
    useEffect,
    useState
} from 'react';

import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";

import NavBar from "./components/NavBar/NavBar"
import MainGame from "./components/MainGame/MainGame"

const App = () => {
    return (
        <div className="App-header">
            <NavBar />
            {/* <MainGame /> */}
        </div>
    );
}

export default App;