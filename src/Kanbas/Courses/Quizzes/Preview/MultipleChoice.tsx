import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { addAnswer } from "./reducer";

export default function MultipleChoiceQuestion({ qid, question }: any) {
        const [ answer, setAnswer ] = useState<string>(question.answer || "");
        const answerChoices = question.answerChoices || "";
        const dispatch = useDispatch();
        useEffect (() => {
            if (answer !== question.answer) {
                /*dispatch(addAnswer({
                    quizId: qid,
                    questionNum: question.number,
                    ans: answer,
                }));*/
            }
        }, [answer, question.answer, question.number, qid, dispatch]);

    return (!question ? <p>Invalid Question</p> :
        <div className="mb-3 ps-3 ps-1">
            <hr />
            <ul style={{ listStyleType: 'none' }}>
                {question.answerChoices.map((answerChoiceObj: any, index: any) => (
                    <li key={index}>
                        <input type="radio" name="radio-multiple-choice" className="ps-3 me-2" id={`choice-${index}`} />
                        <label htmlFor={`choice-${index}`}>{answerChoiceObj.choice}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
}