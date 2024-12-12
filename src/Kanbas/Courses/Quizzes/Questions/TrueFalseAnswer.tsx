import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function TrueFalseAnswer(question: any) {
    const [selectedOption, setSelectedOption] = useState(question.answer || "True");

    const handleSelection = (option: any) => {
        setSelectedOption(option);
        // update quiz with option here
    };

    return (
        <div className="true-false-toggle">
            <div
                className={`option ${selectedOption === "True" ? "selected" : ""}`}
                onClick={() => handleSelection("True")}
            >
                {selectedOption === "True" && <FaArrowRight className="arrow" />}
                <span>True</span>
            </div>
            <div
                className={`option ${selectedOption === "False" ? "selected" : ""}`}
                onClick={() => handleSelection("False")}
            >
                {selectedOption === "False" && <FaArrowRight className="arrow" />}
                <span>False</span>
            </div>
        </div>
    );
};
