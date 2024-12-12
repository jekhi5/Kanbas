import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

interface Answer {
    text: string;
    isCorrect: boolean;
}

export default function FillinTheBlank( question: any) {
    const [answers, setAnswers] = useState<Answer[]>(
        question?.answersChoices?.map((answer: any) => ({ text: answer.choice, isCorrect: answer.isCorrect })) || []
    );

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = { text: value, isCorrect: false }; // Update answer text
        setAnswers(newAnswers);
    };

    const addAnswer = () => {
        setAnswers([...answers, { text: "", isCorrect: false }]); // Add empty answer
    };

    const removeAnswer = (index: number) => {
        const newAnswers = answers.filter((_, i) => i !== index); // Remove answer
        setAnswers(newAnswers);
    };

    return (
        <div className="possible-answers">
            {answers.map((answer, index) => (
                <div key={index} className="answer-row">
                    <label>Possible Answer:</label>
                    <input
                        type="text"
                        value={answer.text}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                    {answers.length > 1 && (
                        <button
                            type="button"
                            className="delete-button"
                            onClick={() => removeAnswer(index)}
                        >
                            <FaTrash />
                        </button>
                    )}
                </div>
            ))}
            <button type="button" className="add-button" onClick={addAnswer}>
                + Add Another Answer
            </button>
        </div>
    );
};
