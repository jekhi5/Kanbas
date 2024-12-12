import { useParams } from "react-router-dom";
// import * as db from "../../../Database";
import { BsPencilSquare } from "react-icons/bs";
import TrueFalseAnswer from "./TrueFalseAnswer";
import FillinTheBlank from "./FillinTheBlankAnswers";
import MultipleChoiceAnswers from "./MultipleChoiceAnswers";
import './index.css';
import { useState } from "react";
import { useSelector } from "react-redux";
import { updateQuestion } from "../client";

export default function Questions() {
    const { qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizReducer);

    const quiz = quizzes.find((quiz: any) => quiz._id === qid);
    const [questionType, setQuestionType] = useState<string>(quiz?.questions[0]?.type || 'multiple-choice');
    const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);

    if (!quiz) {
        return <div>Quiz not found!</div>
    }

    const handleNewQuestion = () => {
        // quiz.add
    };

    const handleCancel = () => {
        setActiveQuestionIndex(null);
    };

    const handleQuestionSelect = (index: number) => {
        setActiveQuestionIndex(index === activeQuestionIndex ? null : index); // Toggle selection
    };

    const handleQuestionMessage = (question: any) => {
        switch (question.type) {
            case 'True-False':
                return (<p>Enter your question text then select if True or False is the correct answer.</p>);
            case 'Open-Response':
                return (<p>Enter your question text.</p>);
            case 'Multiple-Choice':
                return (<p>Enter your question and multiple answers, then select the one correct answer</p>);
            case 'Fill-in-the-Blank':
                return (<p>Enter your question text, then define all possible correct answers for the blank. <br />
                    Students will see the questions followed by a small text box to type their answer.</p>);
            default:
                return (<p>Add all you question information</p>);
        }
    }

    if (!quiz.questions) {
        return <div></div>
    }

    const showAnswerContent = (currentQuestion: any) => {
        switch (currentQuestion.type) {
            case 'True-False':
                return (<TrueFalseAnswer question={currentQuestion} />);
            case 'Open-Response':
                return (<p>This cannot be automatically graded</p>);
            case 'Multiple-Choice':
                return (<MultipleChoiceAnswers question={currentQuestion} />);
            case 'Fill in the Blank':
                return (<FillinTheBlank question={currentQuestion} />);
            default:
                return (<></>);
        }
    };

    const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>, idx: number) => {
        const updatedType = e.target.value;
        // Update the state for the selected question type
        setQuestionType(updatedType);

        // Optionally, update the quiz's questions state if necessary
        quiz.questions[idx].type = updatedType;
    };

    const handleUpdate = async (question: any) => {
        await updateQuestion(quiz, question);
    }


    return (
        <div id="wd-quiz-questions">
            <div className="d-flex">
                <div className="p-6 align-items-stretch w-75">
                {quiz.questions.map((question: any, idx: number) => (
                    <ul className="wd-assignments list-group rounded-0" key={idx} style={{ listStyleType: 'none' }}>
                        <li className="list-group-item p-3 ps-1">
                        <button
                            onClick={() => handleQuestionSelect(idx)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    marginLeft: "auto",
                                    color: activeQuestionIndex === idx ? "green" : "black",
                                }}
                             >
                                <BsPencilSquare size={16} />
                            </button>
                        <div className="mb-3 ps-3 ps-1 d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <div id="wd-quiz-title" className="form-control me-2"> {idx} </div>
                                <select id="wd-quiz-type" className="form-select" style={{width: 200}}
                                    onChange={(e) => handleQuestionTypeChange(e, idx)}>
                                    {question.type && <option value={question.type}>{question.type}</option>}
                                    <option value="multiple-choice">True-False</option>
                                    <option value="true-false">Multiple-Choice</option>
                                    <option value="short-answer">Open-Response</option>
                                    <option value="fill-blank">Fill-in-the-Blank</option>
                                </select>
                            </div>
                            <div className="d-flex align-items-center">
                                pts:
                                <input
                                    id="wd-points"
                                    className="form-control points-input ms-1"
                                    value={question.points}
                                />
                            </div>
                        </div>
                        </li>
                        <li className="list-group-item p-3 ps-1">
                            {handleQuestionMessage(question)}
                            <br />
                            <p style={{ fontWeight: 'bold' }}>Question: </p>
                            <textarea
                                id="wd-question-text"
                                className="form-control narrow-box tall-box"
                            >
                                {question.questionText}
                            </textarea>
                            <br />
                            <p style={{ fontWeight: 'bold' }}>Answer: </p>
                            {showAnswerContent(question)}
                            <br />
                        </li>
                        <div>
                        <br />
                            <button id="wd-questions-cancel" className="btn btn-secondary me-2"
                                onClick={handleCancel}>
                                Cancel
                            </button>
                            <button id="wd-questions-update" className="btn btn-danger"
                                onClick={() => handleUpdate(question)}>
                                Update Question
                            </button>
                        </div>

                    <br />
                    </ul>
                ))}
                </div>
            </div>
            <button id="wd-new-question" className="btn btn-secondary" onClick={handleNewQuestion}>
                + New Question
            </button>
        </div>
    );
}