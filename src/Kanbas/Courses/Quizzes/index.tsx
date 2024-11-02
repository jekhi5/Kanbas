import { BsGripVertical } from "react-icons/bs";
import QuizzesControls from "./QuizzesControls";
import QuizControlButtons from "./QuizControlButton";
import QuizHeadingControlButtons from "./QuizHeadingControlButtons";
import { PiNotePencilDuotone } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import * as db from "../../Database";
import { useParams } from "react-router";
import { format } from 'date-fns';


export default function Quizzes() {
    const { cid } = useParams();
    const quizzes = db.default.quizzes;

    const todaysDate = new Date().setHours(0, 0, 0, 0);

    return (
        <div>
            <QuizzesControls />
            <ul id="wd-quiz-list" className="list-group rounded-0">
                <li className="wd-quiz list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <IoIosArrowDown />
                        <span className="px-3"><b>QUIZZES</b></span>
                        <QuizHeadingControlButtons />
                        <div className="float-end">
                            <span className="border border-dark p-2 rounded-5">60% of Total</span>
                        </div>
                    </div>
                    <ul className="wd-lessons list-group rounded-0">
                        {quizzes
                            .filter((quiz: any) => quiz.course === cid)
                            .map((quiz: any) => (
                                <li className="wd-assignment-list-item list-group-item p-3 ps-1 py-0">
                                    <div className="d-flex mb-3">
                                        <div className="p-2 my-auto">
                                            <BsGripVertical className="me-2 fs-3" />
                                            <PiNotePencilDuotone className="me-2 fs-5" />
                                        </div>
                                        <div className="p-2 my-auto">
                                            <h3>
                                                <a className="wd-quiz-link text-dark text-decoration-none"
                                                    href={`#/Kanbas/Courses/${cid}/quizzes/${quiz._id}`}>
                                                    {quiz.title}
                                                </a>
                                            </h3>
                                            <span className="text-danger"> Multiple Modules </span> | {(Date.parse(quiz.releaseDate.replace(/-/g, " ")) > todaysDate) ? <span><b>Not Available until </b>{format(quiz.releaseDate, "MMMM d 'at' hh:mma") + ' |'}</span> : ''} <span><b>Due</b> {format(quiz.dueDate, "MMMM d 'at' hh:mma")} | {quiz.points} pts</span>
                                        </div>
                                        <div className="ms-auto p-2 my-auto">
                                            <QuizControlButtons />
                                        </div>
                                    </div>
                                </li>))}
                    </ul>
                </li>
            </ul>
        </div >
    );
}
