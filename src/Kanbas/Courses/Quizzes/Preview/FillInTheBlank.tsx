import { useEffect, useState } from "react";
// import { addAnswer } from './reducer';
import { useDispatch } from 'react-redux';

interface Answer {
    text: string;
    isCorrect: boolean;
}

export default function TrueFalseQuestion({ qid, question, onAnswer }: any) {
    const [selectedAnswer, setSelectedAnswer] = useState<string>(question.answer || "");
    const dispatch = useDispatch();

    const updateAnswer = (correct: boolean) => {
        const newAnswer = correct ? "true" : "false";
        setSelectedAnswer(newAnswer);
        onAnswer({
            quizId: qid,
            questionNum: question.number,
            ans: newAnswer,
        });
    };

    useEffect(() => {
        console.log('Selected answer updated:', selectedAnswer);
        /*dispatch(addAnswer({
            quizId: qid,
            questionNum: question.number,
            ans: selectedAnswer,
        }));*/
    }, [selectedAnswer, question.number, qid, dispatch]);

    return (
        <div className="mb-3 ps-3 ps-1">
            <hr />
            <input
                type="radio"
                name={`radio-true-false-${qid}`}
                checked={selectedAnswer === "true"}
                className="ps-3 me-2"
                id="wd-true"
                onChange={() => updateAnswer(true)}
            />
            <label htmlFor="wd-true">True</label>
            <hr />
            <input
                type="radio"
                name={`radio-true-false-${qid}`}
                className="ps-3 me-2"
                id="wd-false"
                checked={selectedAnswer === "false"}
                onChange={() => updateAnswer(false)}
            />
            <label htmlFor="wd-false">False</label>
        </div>
    );
}
