import { useEffect, useState } from "react";
import { addAnswer } from './reducer';
import { useDispatch } from 'react-redux';

export default function TrueFalseQuestion({qid, question}: any) {
    const [ answer, setAnswer ] = useState<string>('false');
    const dispatch = useDispatch();

    useEffect (() => {
        console.log('here');
        dispatch(addAnswer({
            quizId: qid,
            questionNum: question.number,
            ans: answer,
          }));
    }, [answer, question.number, qid, dispatch]);

    
    return (
        <div className="mb-3 ps-3 ps-1">
            <hr />
            <input type="radio" name="radio-multiple-choice" checked={answer === "true"} 
             className="ps-3 me-2" id="wd-true" onChange={() => setAnswer('true')}/>
            <label htmlFor="wd-true">True</label><br />
            <hr />
            <input type="radio" name="radio-multiple-choice" className="ps-3 me-2" id="wd-false" 
                checked={answer === "false"} onChange={() => setAnswer('false')}/>
            <label htmlFor="wd-false">False</label><br />
        </div>
    );
}