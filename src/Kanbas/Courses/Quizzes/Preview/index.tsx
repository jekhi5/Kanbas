import { useParams } from 'react-router-dom';
import { Moment } from 'moment';
import TrueFalseQuestion from './TrueFalse';
import OpenResponse from './OpenResponse';
import moment from 'moment';
import { CgPentagonRight } from 'react-icons/cg';
import { useState } from 'react';
import MultipleChoiceQuestion from './MultipleChoice';
import { useSelector } from 'react-redux';

export default function ActiveQuiz() {
  const { qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    if (!quiz) {
        return <div>Quiz not found!</div>
    }

    const DATE_TIME_FORMAT = 'MMM D [at] h:mma';
    let start_time: Moment = moment();
    const format_time = start_time.format(DATE_TIME_FORMAT);
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const handleNextQuestion = () => {
        // Check if there are more questions to show
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    }

    const handleSubmit = () => {
        alert('submit');
    }

    if (!currentQuestion) {
        return <div>Invalid Quiz! No Questions!</div>
    }

    const showQuestionContent = () => {
        switch (currentQuestion.type) {
            case 'True-False':
                return (<TrueFalseQuestion qid={qid} question={currentQuestion} />);
            case 'Open-Response':
                return (<OpenResponse qid={qid} question={currentQuestion} />);
            case 'Multiple-Choice':
                if (!currentQuestion.answerChoices) {
                    return <p>Invalid Multiple Choice Question! No answer choices provided!</p>;
                }
                return (<MultipleChoiceQuestion qid={qid} question={currentQuestion} />);
            default:
                return (<p>Invalid Question Type: {currentQuestion.type}</p>);
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
                {quiz.questions.length-1 > currentQuestionIndex ?
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