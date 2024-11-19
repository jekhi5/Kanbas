import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAnswer } from "./reducer";

export default function OpenResponse({qid, question}: any) {
    const [ answer, setAnswer ] = useState<string>(question.answer || "");
    const dispatch = useDispatch();

    useEffect (() => {
        if (answer !== question.answer) {
            dispatch(addAnswer({
                quizId: qid,
                questionNum: question.number,
                ans: answer,
            }));
        }
    }, [answer, question.answer, question.number, qid, dispatch]);


    return (
        <div className="mb-3 ps-3 ps-1">
            <hr />
            <textarea style={{height: "100px",  width: "800px"}}
             onChange={(e) => setAnswer(e.target.value)} defaultValue={question.answer}></textarea>
        </div>
    );
}