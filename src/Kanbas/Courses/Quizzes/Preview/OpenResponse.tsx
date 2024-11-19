import { useState } from "react";

export default function OpenResponse() {
    const [ answer, setAnswer ] = useState<string>('');

    return (
        <div className="mb-3 ps-3 ps-1">
            <hr />
            <textarea style={{height: "100px",  width: "800px"}}
             onChange={() => setAnswer('stuff in text area')}></textarea>
        </div>
    );
}