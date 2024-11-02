import { useParams } from "react-router-dom";
import * as db from "../../Database";
import { Moment } from "moment";
import TrueFalseQuestion from "./MultipleChoice";
import OpenResponse from "./OpenResponse";
import moment from "moment";
import { CgPentagonRight } from "react-icons/cg";
import { useState } from "react";

export default function ActiveQuiz() {
    const { cid, qid } = useParams();
    const quiz = db.default.quizzes.find((quiz) => quiz._id === qid);
    const DATE_TIME_FORMAT = 'MMM D [at] h:mma';
    let start_time: Moment = moment();
    const format_time = start_time.format(DATE_TIME_FORMAT);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = quiz?.questions[currentQuestionIndex];
    const handleNextQuestion = () => {
        // Check if there are more questions to show
        if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert("Submitted!");
        }
    };
    const showQuestionContent = () => {
        switch (currentQuestion?.type) {
            case 'True-False':
                return (<TrueFalseQuestion />);
            case 'Open-Response':
                return (<OpenResponse />);
            default:
                return (<p>Invalid</p>);
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
                                            Question {currentQuestion?.number}
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
                                        {currentQuestion?.description}
                                    </div>
                                    {showQuestionContent()}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="d-flex justify-content-end border-black" style={{ marginRight: '19%' }}>
                <button id="wd-cancel" className="btn btn-secondary w-30 me-1"
                    onClick={handleNextQuestion}>
                    Next
                </button>
            </div>

        </div>
    );
}