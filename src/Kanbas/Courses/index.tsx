import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import ActiveQuiz from "./Quizzes/Preview";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import * as db from "../Database";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/details";
import QuizEditor from "./Quizzes/editor";

export default function Courses() {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const course = db.default.courses.find((course) => course._id === cid);
    const quizzes = db.default.quizzes;
    const quizId = pathname.split("/")[5];
    const quiz = quizzes.find(quiz => quiz._id === quizId);

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}
                {quiz && quiz.title ? (
                    <>
                        <span className="text-danger"> {' > '} </span>
                        <span className="text-secondary">{quiz.title}</span>
                    </>
                ) : null}
            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation />
                </div>
                <div className="flex-fill ">

                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="Quizzes/:qid" element={<QuizDetails />} />
                        <Route path="Quizzes/:qid/preview" element={<ActiveQuiz />} />
                        <Route path="Quizzes/:qid/edit" element={<QuizEditor />} />
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
