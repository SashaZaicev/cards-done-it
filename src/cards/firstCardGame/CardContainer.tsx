import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import style from "./QuestionList.module.css"
import {cardType, categoryType, questionItemType} from "../../types/TypesContainer";
import QuestionsList from "./QuestionsList";

type CardContainerTypes = {
    treeData: Array<cardType>
    changeGame: (e: number) => void
}

const CardContainer: React.FC<CardContainerTypes> = (
    {treeData,changeGame}) => {
    const [questions, setQuestions] = useState(treeData);
    const [categories, setCategories] = useState([])
    const categoryEl = useRef<HTMLSelectElement>(null)
    const amountEl = useRef<HTMLInputElement>(null)
    useEffect(() => {
        axios
            .get('https://opentdb.com/api_category.php')
            .then(res => {
                setCategories(res.data.trivia_categories)
            })
        const allAnswers = treeData.map((question) => ({
            ...question,
            answers: [
                question.answer,
                ...question.options
            ].sort(() => Math.random() - 0.5)
        }))
        setQuestions(allAnswers);
    }, [])

    function decodeString(str: string) {
        const textArea = document.createElement('textarea')
        textArea.innerHTML = str
        return textArea.value
    }


    function handleSubmit(e: React.FormEvent<EventTarget>) {
        e.preventDefault()
        const amountElement = amountEl.current;
        const categoryElement = categoryEl.current;
        axios
            .get('https://opentdb.com/api.php', {
                params: {
                    amount: amountElement && amountElement.value,
                    category: categoryElement && categoryElement.value
                }
            })
            .then(res => {
                setQuestions(res.data.results.map((questionItem: questionItemType, index: string) => {
                    const answer = decodeString(questionItem.correct_answer);
                    const questions = decodeString(questionItem.question)
                    const options = [...questionItem.incorrect_answers.map(
                        (a: string) => decodeString(a)), answer]
                    return {
                        id: `${index}-${Date.now()}`,
                        question: questions,
                        answer: answer,
                        options: options.sort(() => Math.random() - .5)
                    }
                }))
            })
    }

    return (
        <>
            <form className={style.header} onSubmit={handleSubmit}>
                <div className={style.formGroup}>
                    <label htmlFor="category">Category</label>
                    <select name="" id="category" ref={categoryEl}>
                        {categories.map((category: categoryType) => {
                            return <option value={category.id} key={category.id}>
                                {category.name}
                            </option>
                        })}
                    </select>
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="amount">Number Of Questions</label>
                    <input type="number" id="amount" min='1' step='1'
                           defaultValue={10} ref={amountEl}/>
                </div>
                <div className={style.formGroup}>
                    <button className={style.btn}>Generate</button>
                </div>
                <div className={style.formGroup}>
                    <button className={style.btnHome} onClick={() => changeGame(3)}>HOME</button>
                </div>
            </form>
            <div className={style.container}>
                <QuestionsList questionsCards={questions}/>
            </div>
        </>
    );
};

export default CardContainer;