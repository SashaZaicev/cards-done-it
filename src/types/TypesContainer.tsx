export type questionItemType = {
    id: string | number,
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: Array<string>,
    question: string,
    type: string,
}

export type cardType = {
    category: string
    answer: string
    difficulty: string
    options: Array<string>
    question: string
    type: string
    image: string
}

export type cardsType = {
    answer: string
    category: string
    difficulty: string
    options: Array<string>
    question: string
    type: string
    image: string
}
export type categoryType = {
    id: string | number,
    name: string,
}
