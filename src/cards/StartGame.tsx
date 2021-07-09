import React from 'react';
import style from "./StartGame.module.css"
import game1 from '../images/1.png'
import game2 from '../images/2.png'

type StartType = {
    changeGame: (e:number)=>void
}


const StartGame: React.FC<StartType> = ({changeGame}) => {

    return (
        <div className={style.startContainer}>
            <h1 id={style.blink}>Choice type card game</h1>
            <div className={style.choiceContainer}>
                <div className={style.firstGame}
                     onClick={()=>changeGame(1)}>
                    <img  src={game1} alt="game1"/>
                </div>
                <div className={style.secondGame}
                     onClick={()=>changeGame(2)}>
                    <img  src={game2} alt="game2"/>
                </div>

            </div>
        </div>
    );
};

export default StartGame;