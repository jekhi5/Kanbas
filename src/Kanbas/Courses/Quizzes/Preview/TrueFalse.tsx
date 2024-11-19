import { useState } from "react";

export default function TrueFalseQuestion() {
    const [ answer, setAnswer ] = useState<boolean>(false);
    
    return (
        <div className="mb-3 ps-3 ps-1">
            <hr />
            <input type="radio" name="radio-multiple-choice" className="ps-3 me-2" id="wd-true" />
            <label htmlFor="wd-true" onChange={() => setAnswer(true)}>True</label><br />
            <hr />
            <input type="radio" name="radio-multiple-choice" className="ps-3 me-2" id="wd-false" />
            <label htmlFor="wd-false" onChange={() => setAnswer(false)}>False</label><br />
        </div>
    );
}