export interface IQuizList {
    id: number;
    title: string;
}

export interface ICreateQuiz {
    questions: [{
        correct_option: number,
        options: [],
        text: string
    }];
    title: string;
}

export interface IStartQuiz {
    questions: [{
        options: [],
        text: string
    }];
    title: string;
}

export interface ISubmitAnswer {
    question_id: number,
    selected_option: number
}
