import React from 'react';
import {cardType} from "../../types/TypesContainer";
import MultipleComponent from "./MultipleComponent";

type QuestionCardTypes = {
    card: cardType
}

const QuestionCard: React.FC<QuestionCardTypes> = ({card}) => {
    return <MultipleComponent card={card}/>;
};

export default QuestionCard;