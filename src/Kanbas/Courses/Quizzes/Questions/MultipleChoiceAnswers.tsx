import React, { useState } from "react";
import { FaTrash, FaArrowRight } from "react-icons/fa";
import { TbPencilCheck } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { updateQuiz } from "../reducer";
import * as quizClient from "../client"

interface Answer {
    text: string;
    isCorrect: boolean;
}

export default function MultipleChoiceAnswers (question: any) {
    const { qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const quiz = quizzes.find((quiz: any) => quiz._id === qid);
    const [answers, setAnswers] = useState<Answer[]>(
        question.answerChoices?.map((answerChoiceObj: any) => ({
          text: answerChoiceObj.choice,
          isCorrect: answerChoiceObj.isCorrect,
        })) || []
      );
    
    console.log(question);
    console.log(answers);
    
    const handleAnswerChange = async (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index].text = value;
        const updatedQuiz = {
            ...quiz,
            ...newAnswers,
          };
          setAnswers(newAnswers);
          await quizClient.updateQuiz(updatedQuiz);
          dispatch(updateQuiz(updatedQuiz));
    };

    const addAnswer = () => {
        setAnswers([...answers, { text: "", isCorrect: false }]);
    };

    const removeAnswer = (index: number) => {
        const newAnswers = answers.filter((_, i) => i !== index);
        setAnswers(newAnswers);
    };

    const toggleCorrectAnswer = (index: number) => {
        const newAnswers = answers?.map((answer, i) => ({
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
function dispatch(arg0: { payload: any; type: "quizzes/updateQuiz"; }) {
    throw new Error("Function not implemented.");
}

