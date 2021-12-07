import './App.css';
import './assets/fonts/font_importer.css';
import React from 'react';

import NavBar from "./components/NavBar/NavBar";
import MainGame from "./components/MainGame/MainGame"

const App = () => {
    return (
        <div className="App-header">
            <NavBar />
            <MainGame />
        </div>
    );
}

export default App;