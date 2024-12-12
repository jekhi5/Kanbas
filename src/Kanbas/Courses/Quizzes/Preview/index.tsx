import { useNavigate, useParams } from 'react-router-dom';
import { Moment } from 'moment';
import TrueFalseQuestion from './TrueFalse';
import OpenResponse from './OpenResponse';
import moment from 'moment';
import { CgPentagonRight } from 'react-icons/cg';
import { useState } from 'react';
import MultipleChoiceQuestion from './MultipleChoice';
import { useSelector } from 'react-redux';
import FillInTheBlank from './FillInTheBlank';

export default function ActiveQuiz() {
    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const quiz = quizzes.find((quiz: any) => quiz._id === qid);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: any }>({});
    const DATE_TIME_FORMAT = 'MMM D [at] h:mma';
    let start_time: Moment = moment();
    const format_time = start_time.format(DATE_TIME_FORMAT);
    const navigate = useNavigate();


    if (!quiz) {
        return <div>Quiz not found!</div>;
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    const handleAnswer = (questionIndex: number, answer: any) => {
        setAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleSubmit = () => {
        console.log('User answers:', answers);
        // Navigate to QuizResults or send answers to the server
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/results`, { state: { answers } });
    };

    const showQuestionContent = () => {
        switch (currentQuestion.type) {
            case 'True-False':
                return (
                    <TrueFalseQuestion
                        qid={qid}
                        question={currentQuestion}
                        onAnswer={(answer: any) =>
                            handleAnswer(currentQuestionIndex, answer)
                        }
                    />
                );
            case 'Open-Response':
                return (
                    <OpenResponse
                        qid={qid}
                        question={currentQuestion}
                        onAnswer={(answer: string) =>
                            handleAnswer(currentQuestionIndex, answer)
                        }
                    />
                );
            case 'Multiple-Choice':
                return (
                    <MultipleChoiceQuestion
                        qid={qid}
                        question={currentQuestion}
                        onAnswer={(answer: any) =>
                            handleAnswer(currentQuestionIndex, answer)
                        }
                    />
                );
            case 'Fill-In-The-Blank':
                return (
                    <FillInTheBlank
                        question={currentQuestion}
                        onAnswer={(answer: any) =>
                            handleAnswer(currentQuestionIndex, answer)
                        }
                    />
                );
            default:
                return <p>Invalid Question Type: {currentQuestion.type}</p>;
        }
    };

    return (
        <div id="wd-active-quiz">
            <label>
                Started: {format_time}
            </label><br />
            <h2 id="wd-name" key={quiz?._id}>
                {quiz?.title}
            </h2>
            <hr />

            <div className="d-flex">
                <div className="p-2">
                    <CgPentagonRight className="fs-3" style={{ height: "50px", width: "50px" }} />
                </div>
                <div className="p-6 align-items-stretch w-75">
                    <ul id="wd-modules" className="list-group rounded-0">
                        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray ">
                            <div className="p-2 bg-secondary">
                                <h4 className="wd-text-strong">
                                    <div className="d-flex mb-3">
                                        <div className="p-2">
                                            Question {currentQuestion.number}
                                        </div>
                                        <div className="ms-auto p-2">
                                            {currentQuestion?.points} pts
                                        </div>
                                    </div>
                                </h4>
                            </div>
                            <ul className="wd-assignments list-group rounded-0">
                                <li className="list-group-item p-3 ps-1">
                                    <div className="d-flex mb-3">
                                        {currentQuestion.questionText}
                                    </div>
                                    {showQuestionContent()}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='d-flex '>
                <div className='d-flex w-100 justify-content-start' style={{ marginLeft: '5%' }}>
                    {0 < currentQuestionIndex &&
                        <button id="wd-last" className="btn btn-secondary w-30 me-1"
                            onClick={handlePreviousQuestion}>
                            Previous
                        </button>}
                </div>
                <div className='d-flex justify-content-end' style={{ marginRight: '18%' }}>
                    {quiz.questions.length - 1 > currentQuestionIndex ?
                        <button id="wd-next" className="btn btn-secondary w-30 me-1"
                            onClick={handleNextQuestion}>
                            Next
                        </button> :
                        <button id="wd-submit" className="btn btn-danger w-30 me-1" onClick={handleSubmit}>
                            Submit
                        </button>}
                </div>
            </div>

        </div>
    );
}
