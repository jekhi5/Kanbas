import { useParams } from "react-router-dom";
import * as db from "../../../Database";
import TrueFalseAnswer from "./TrueFalseAnswer";
import FillinTheBlank from "./FillinTheBlankAnswers";
import MultipleChoiceAnswers from "./MultipleChoiceAnswers";
import './index.css';
import { useState } from "react";

export default function Questions() {
    const { qid } = useParams();
    const quiz = db.quizzes.find((quiz) => quiz._id === qid);
    const [questionType, setQuestionType] = useState<string>(quiz?.questions[0]?.type || 'multiple-choice');

    if (!quiz) {
        return <div>Quiz not found!</div>
    }

    const handleNewQuestion = () => {
        // quiz.add
    };

    const handlePreviousQuestion = () => {
        // setCurrentQuestionIndex(currentQuestionIndex - 1);
    }

    const handleSubmit = () => {
        alert('submit');
    }

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


    return (
        <div id="wd-quiz-questions">
            <div className="d-flex">
                <div className="p-6 align-items-stretch w-75">
                {quiz.questions.map((question, idx) => (
                    <ul className="wd-assignments list-group rounded-0" key={idx} style={{ listStyleType: 'none' }}>
                        <li className="list-group-item p-3 ps-1">
                        <div className="mb-3 ps-3 ps-1 d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <input id="wd-quiz-title" className="form-control me-2" value={question.title} />
                                <select id="wd-quiz-type" className="form-select"
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
                            <button id="wd-questions-cancel" className="btn btn-secondary me-2">
                                Cancel
                            </button>
                            <button id="wd-questions-update" className="btn btn-danger">
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