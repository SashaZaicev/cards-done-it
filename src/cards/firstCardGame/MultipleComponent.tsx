import React, {useEffect, useRef, useState} from 'react';
import style from "./QuestionCard.module.css";
import {cardType} from "../../types/TypesContainer";

type QuestionCardTypes = {
    card: cardType
}
const MultipleComponent: React.FC<QuestionCardTypes> = ({card: {question, answer, options, answers, image}}) => {
    const [height, setHeight] = useState(0)
    const [turn, setTurn] = useState(false)
    const flip = () => {
        setTurn(!turn)
    }
    const frontEl = useRef() as React.MutableRefObject<HTMLInputElement>
    const backEl = useRef() as React.MutableRefObject<HTMLInputElement>

    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        const resultHeight = Math.max(frontHeight, backHeight, 200)
        setHeight(resultHeight)
    }

    useEffect(setMaxHeight, [question, answer, answers, image])
    useEffect(() => {
        window.addEventListener("resize", setMaxHeight)
        return () => window.removeEventListener("resize", setMaxHeight)
    }, [])
    return (
        <div className={`${style.card} ${turn ? style.turnCard : ''}`}
             style={{height: height}}
             onClick={flip}>
            <div className={style.front} ref={frontEl}>
                <div className={style.titleQ} dangerouslySetInnerHTML={{__html: question}}/>
                {image && <img width="100%" height="89" alt="" src={image}/>}
                <div className={style.cardOptions}>
                    {answers?.map((option: string, index: string | number) => {
                        return <div key={`${index}-${Date.now()}`}
                                    className={style.cardOption}>{option}</div>
                    })}
                </div>

            </div>
            <div className={style.back}
                 ref={backEl}>{answer}</div>
        </div>
    );
};

export default MultipleComponent;