import { useLocation, useParams } from "react-router-dom";
//import * as db from "../../../Database";
import { CgCloseO } from "react-icons/cg";  // Import checkmark and X icons
import GreenCheckmark from "../../GreenCheckmark";
import { useSelector } from "react-redux";

export default function QuizResults() {
    const { qid } = useParams();
    const location = useLocation();
    const { answers } = location.state || {};
    console.log(answers);
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const quiz = quizzes.find((quiz: any) => quiz._id === qid);


    if (!quiz) {
        return <div>Quiz not found!</div>;
    }

    const calculateScore = () => {
        let score = 0;
        let totalPoints = 0;
        let idx = 0;
        quiz.questions.forEach((question: any) => {
            totalPoints += parseInt(question.points);
            if (answers[idx] === question.answer) {
                score += parseInt(question.points);
            }
            idx = idx + 1;
        });
        return { totalPoints, score };
    };

    const { totalPoints, score } = calculateScore();

    return (
        <div id="wd-quiz-results">
            <h2 id="wd-name" key={quiz?._id}>
                {quiz?.title} Score: {score} / {totalPoints}
            </h2>
            <hr />

            <div>
                {quiz.questions.map((question: any, index: number) => {
                    const userAnswer = answers[index];
                    const isCorrect = userAnswer === question.answer;
                    return (
                        <div key={index} className="d-flex mb-3 p-3 bg-light border rounded-3">
                            <div className="p-2 flex-grow-1">
                                <h5>Question {question.number} / {question?.points} pts</h5>
                                <p>{question.questionText}</p>
                                {question.type === 'Multiple-Choice' && question.answerChoices && (
                                    <ul>
                                        {question.answerChoices.map((answerChoiceObj: any, idx: number) => {
                                            const isAnswerSelected = userAnswer === answerChoiceObj.choice;
                                            return (
                                                <li key={idx} className={`d-flex align-items-center ${isAnswerSelected ? (isCorrect ? 'text-success' : 'text-danger') : ''}`}>
                                                    <input
                                                        type="radio"
                                                        name={`multiple-choice-${question.number}`}
                                                        checked={isAnswerSelected}
                                                        disabled
                                                        className="me-2"
                                                    />
                                                    <label>{answerChoiceObj.choice}</label>
                                                    {isAnswerSelected && (
                                                        isCorrect ? <GreenCheckmark /> : <CgCloseO className="ms-2 text-danger" />
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                                {question.type === 'True-False' && (
                                    <div className={`d-flex align-items-center ${isCorrect ? 'text-success' : 'text-danger'}`}>
                                        <input
                                            type="radio"
                                            name={`true-false-${question.number}`}
                                            checked={userAnswer === 'true'}
                                            disabled
                                            className="me-2"
                                        />
                                        <label>True</label>
                                        <input
                                            type="radio"
                                            name={`true-false-${question.number}`}
                                            checked={userAnswer === 'false'}
                                            disabled
                                            className="ms-3 me-2"
                                        />
                                        <label>False</label>
                                        {isCorrect ? <GreenCheckmark /> : <CgCloseO className="ms-2 text-danger" />}
                                    </div>
                                )}
                                {question.type === 'Open-Response' && (
                                    <div className={`d-flex align-items-center ${isCorrect ? 'text-success' : 'text-danger'}`}>
                                        <p style={{ fontStyle: 'italic', wordWrap: 'break-word' }}>
                                            {userAnswer || "No answer provided"}
                                        </p>
                                        {isCorrect ? <GreenCheckmark /> : <CgCloseO className="ms-2 text-danger" />}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
