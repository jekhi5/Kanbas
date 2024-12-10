import React, { useState } from "react";
import { FaTrash, FaArrowRight } from "react-icons/fa";
import { TbPencilCheck } from "react-icons/tb";

interface Answer {
    text: string;
    isCorrect: boolean;
}

export default function MultipleChoiceAnswers (question: any) {
    const [answers, setAnswers] = useState<Answer[]>(question?.answers?.map((answer: string) => ({ text: answer, isCorrect: false })) || []);
    
    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index].text = value;
        setAnswers(newAnswers);
    };

    const setCorrectAnswer = (index: number) => {
        const newAnswers = answers.map((answer, i) => ({
            ...answer,
            isCorrect: i === index,
        }));
        setAnswers(newAnswers);
    };

    const addAnswer = () => {
        setAnswers([...answers, { text: "", isCorrect: false }]);
    };

    const removeAnswer = (index: number) => {
        const newAnswers = answers.filter((_, i) => i !== index);
        setAnswers(newAnswers);
    };

    const toggleCorrectAnswer = (index: number) => {
        const newAnswers = answers.map((answer, i) => ({
            ...answer,
            isCorrect: i === index ? !answer.isCorrect : false,
        }));
        setAnswers(newAnswers);
    };

    return (
        <div className="possible-answers">
            <h3>Answers:</h3>
            {answers.map((answer, index) => (
                <div key={index} className={`answer-row ${answer.isCorrect ? "correct" : ""}`}>
                    {answer.isCorrect ? (
                        <FaArrowRight className="correct-icon" />
                    ) : (
                        <FaArrowRight className="placeholder-icon" />
                    )}
                    <label>{answer.isCorrect ? "Correct Answer" : "Possible Answer"}:</label>
                    <input
                        type="text"
                        value={answer.text}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                    <div className="action-buttons">
                    <button
                            type="button"
                            className={`correct-button ${answer.isCorrect ? "selected" : ""}`}
                            onClick={() => toggleCorrectAnswer(index)}
                        >
                            <TbPencilCheck />
                        </button>
                        <button
                            type="button"
                            className="delete-button"
                            onClick={() => removeAnswer(index)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
            <button type="button" className="add-button" onClick={addAnswer}>
                + Add Another Answer
            </button>
        </div>
    );
};
