import React from 'react';
import style from "./NewList.module.css";
import {cardType} from "../../types/TypesContainer";
import Timer from "./Timer";

type QuestionTypes = {
    questions: cardType
    handleNextQuestion: () => void
    showAnswers: boolean
    handleAnswer: (ans: string) => void
    changeGame: (e: number) => void
    startGame: () => void
    handleFinishGame: () => void
    isActive: boolean
}

const Questions: React.FC<QuestionTypes> = ({handleFinishGame,
                                                isActive, startGame,
                                                changeGame,
                                                handleNextQuestion,
                                                showAnswers,
                                                handleAnswer,
                                                questions: {question, answer, answers, image}
                                            }) => {

    return (
        <div className={style.box}>
            <span className={style.timeBlock}><Timer handleFinishGame={handleFinishGame} startGame={startGame} isActive={isActive}/></span>
            <div className={style.titleQ}>
                <h2 dangerouslySetInnerHTML={{__html: question}}/>
                {image && <img width="220px" height="89" alt="" src={image}/>}
            </div>
            <div className={style.answerContainer}>
                <div className={style.answers}>{answers?.map((ans, index) => {
                    const trueColor = showAnswers ? ans === answer ? `${style.colorWin}` : `${style.colorLose}` : ''
                    return (
                        <button key={`${index} + ${Date.now()}`} onClick={() => handleAnswer(ans)}
                                className={`${style.answer} ${trueColor}`}
                                dangerouslySetInnerHTML={{__html: ans}}/>
                    )
                })}</div>
                <div className={style.blockBtnNext}>

                    {showAnswers &&
                    <button className={style.btnNext} onClick={handleNextQuestion}>Next</button>}
                    <button className={style.btnHome} onClick={() => changeGame(3)}>HOME</button>
                </div>

            </div>
        </div>
    );
};

export default Questions;