import React, {useEffect, useState} from 'react';
import {cardType} from "../../types/TypesContainer";
import style from "./NewList.module.css";
import Questions from "./Questions";

type CardContainerTypes = {
    treeData: Array<cardType>
    changeGame: (e: number) => void
}
const CheckCards: React.FC<CardContainerTypes> = (
    {treeData, changeGame}) => {

    const [questions, setQuestions] = useState(treeData);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [showAnswers, setShowAnswers] = useState(false)
    const [isActive, setIsActive] = useState(false);
    const [finishGame, setFinishGame] = useState(false)

    const startGame = () => {
        setIsActive(!isActive)
    }
    useEffect(() => {
        setIsActive(true)
        const allAnswers = treeData.map((question) => ({
            ...question,
            answers: [
                question.answer,
                ...question.options
            ].sort(() => Math.random() - 0.5)
        }))
        setQuestions(allAnswers);
    }, [])

    const handleNextQuestion = () => {
        setCurrentIndex(currentIndex + 1)
        setShowAnswers(false)
    }
    const handleAnswer = (answer: string) => {
        if (!showAnswers) {
            if (answer === questions[currentIndex].answer) {
                setScore(score + 1)
            }
        }
        setShowAnswers(true)
    }

    const handleFinishGame = () => {
        setFinishGame(!finishGame)
    }
    const lengthArray = questions.length
    return lengthArray > 0
        ? (
            <div className={style.container}>
                {currentIndex >= questions.length || finishGame
                    ? (
                        <div className={style.winBlock}>
                            <h1 className={style.winTitle}>YOUR SCORE WAS {score}</h1>
                            <button className={style.btnHome}
                                    onClick={() => changeGame(3)}>HOME
                            </button>
                        </div>)
                    : (
                        <Questions handleFinishGame={handleFinishGame}
                                   isActive={isActive}
                                   startGame={startGame}
                                   changeGame={changeGame}
                                   handleNextQuestion={handleNextQuestion}
                                   showAnswers={showAnswers}
                                   questions={questions[currentIndex]}
                                   handleAnswer={handleAnswer}
                                   currentIndex={currentIndex}
                                   lengthArray={lengthArray}
                        />)}
            </div>)
        : <div>Loading...</div>
};

export default CheckCards;