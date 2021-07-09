import React, {useEffect, useState} from 'react';

type TimerTypes = {
    startGame: () => void
    handleFinishGame: () => void
    isActive: boolean
}

const Timer: React.FC<TimerTypes> = ({handleFinishGame,startGame, isActive}) => {
    let [second, setSecond] = useState(15);
    useEffect(() => {
        let intervalId = 0;

        if (isActive) {
            intervalId = window.setInterval(() => {
                if (second === 0) {
                    startGame()
                    handleFinishGame()
                } else {
                    let current = --second
                if (current < 10) {
                     // current = `0${current}`
                }
                    setSecond(current)
            }
            }, 1000)
        }

        return () => clearInterval(intervalId);
    }, [isActive, second])
    return (
        <div>
            <span className="second">{second}</span>
        </div>
    );
};

export default Timer;