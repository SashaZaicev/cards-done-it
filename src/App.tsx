import './App.css';
import StartGame from "./cards/StartGame";
import React, {useState} from "react";
import CardContainer from "./cards/firstCardGame/CardContainer";
import fileJSON from "./data.json";
import CheckCards from "./cards/secondCardGame/CheckCards";

const treeData = fileJSON


function App() {
    const [startFirstGame, setStartFirstGame] = useState(false)
    const [startSecondGame, setStartSecondGame] = useState(false)
    const changeGame = (e: number) => {
        e === 1 && setStartFirstGame(true)
        e === 2 && setStartSecondGame(true)
        e === 3 && setStartSecondGame(false)
        e === 3 && setStartFirstGame(false)
    }

    return (
        <div className="App">
            <header>
            </header>
            {startFirstGame ? <CardContainer changeGame={changeGame} treeData={treeData}/>
                : startSecondGame ? <CheckCards changeGame={changeGame} treeData={treeData}/>
                    : <StartGame changeGame={changeGame}/>}

            {/*//answer on the other side of the card*/}
            {/*<CardContainer treeData={treeData}/>*/}
            {/*//Choose the correct answer*/}
            {/*<CheckCards treeData={treeData}/>*/}
        </div>
    );
}

export default App;
