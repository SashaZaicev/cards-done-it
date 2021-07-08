import React from 'react';
import style from "./QuestionList.module.css"
import {cardsType} from "../../types/TypesContainer";
import QuestionCard from "./QuestionCard";

type QuestionsListTypes = {
    questionsCards: Array<cardsType>
}
const QuestionsList: React.FC<QuestionsListTypes> = ({questionsCards}) => {
    return (
        <div className={style.cardListContainer}>
            {questionsCards.map((card, index) => {
                return <QuestionCard card={card} key={`${index} + ${Date.now()}`}/>
            })}
        </div>
    );
}

export default QuestionsList;