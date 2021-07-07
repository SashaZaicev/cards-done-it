import React, {useEffect, useRef, useState} from 'react';
import style from "./QuestionCard.module.css"
import {cardType} from "../types/TypesContainer";

type QuestionCardTypes = {
    card: cardType
}

const QuestionCard: React.FC<QuestionCardTypes> = ({card}) => {
    const [turn, setTurn] = useState(false)
    const [height, setHeight] = useState(0)
    const flip = () => {
        setTurn(!turn)
    }
    const frontEl = useRef() as React.MutableRefObject<HTMLInputElement>
    const backEl = useRef() as React.MutableRefObject<HTMLInputElement>

    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        const resultHeight = Math.max(frontHeight, backHeight, 100)
        setHeight(resultHeight)
    }

    useEffect(setMaxHeight, [card.question, card.answer, card.options])
    useEffect(() => {
        window.addEventListener("resize", setMaxHeight)
        return () => window.removeEventListener("resize", setMaxHeight)
    }, [])

    return (
        <div className={`${style.card} ${turn ? style.turnCard : ''}`}
             style={{height: height}}
             onClick={flip}>
            <div className={style.front} ref={frontEl}>
                {!card.image ? <div>{card.question}
                        <div>{card.image}</div>
                    </div> :
                    <div>{card.question}</div>}
                <div className={style.cardOptions}>
                    {card.options.map((option: string, index: string | number) => {
                        return <div key={`${index}-${Date.now()}`}
                                    className={style.cardOption}>{option}</div>
                    })}
                </div>

            </div>
            <div className={style.back}
                 ref={backEl}>{card.answer}</div>
        </div>
    );
};

export default QuestionCard;