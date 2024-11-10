import { BsGripVertical } from "react-icons/bs";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButton";
import AssignmentHeadingControlButtons from "./AssignmentHeadingControlButtons";
import { PiNotePencilDuotone } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";


export default function Assignments() {
    return (
        <div>
            <AssignmentsControls />
            <ul id="wd-assignment-list" className="list-group rounded-0">
                <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <IoIosArrowDown />
                        <span className="px-3"><b>ASSIGNMENTS</b></span>
                        <AssignmentHeadingControlButtons />
                        <div className="float-end">
                            <span className="border border-dark p-2 rounded-5">40% of Total</span>
                        </div>
                    </div>
                    <ul className="wd-lessons list-group rounded-0">
                        <li className="wd-assignment-list-item list-group-item p-3 ps-1 py-0">
                            <div className="d-flex mb-3">
                                <div className="p-2 my-auto">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <PiNotePencilDuotone className="me-2 fs-5" />
                                </div>
                                <div className="p-2 my-auto">
                                    <h3>
                                        <a className="wd-assignment-link text-dark text-decoration-none"
                                            href="#/Kanbas/Courses/1234/Assignments/123">
                                            A1 - ENV + HTML
                                        </a>
                                    </h3>
                                    <span className="text-danger"> Multiple Modules </span> | <span><b>Not Available until</b> May 6 at 12:00am</span> | <span><b>Due</b> May 13 at 11:59pm | 100 pts</span>
                                </div>
                                <div className="ms-auto p-2 my-auto">
                                    <AssignmentControlButtons />
                                </div>
                            </div>
                        </li>
                        <li className="wd-assignment-list-item list-group-item p-3 ps-1 py-0">
                            <div className="d-flex mb-3">
                                <div className="p-2 my-auto">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <PiNotePencilDuotone className="me-2 fs-5" />
                                </div>
                                <div className="p-2 my-auto">
                                    <h3>
                                        <a className="wd-assignment-link text-dark text-decoration-none"
                                            href="#/Kanbas/Courses/1234/Assignments/123">
                                            A2 - CSS + BOOTSTRAP
                                        </a>
                                    </h3>
                                    <span className="text-danger"> Multiple Modules </span>| <span><b>Not Available until</b> May 13 at 12:00am</span> | <span><b>Due</b> May 20 at 11:59pm | 100 pts</span>
                                </div>
                                <div className="ms-auto p-2 my-auto">
                                    <AssignmentControlButtons />
                                </div>
                            </div>
                        </li>
                        <li className="wd-assignment-list-item list-group-item p-3 ps-1 py-0">
                            <div className="d-flex mb-3">
                                <div className="p-2 my-auto">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <PiNotePencilDuotone className="me-2 fs-5" />
                                </div>
                                <div className="p-2 my-auto">
                                    <h3>
                                        <a className="wd-assignment-link text-dark text-decoration-none"
                                            href="#/Kanbas/Courses/1234/Assignments/123">
                                            A3 - JAVASCRIPT + REACT
                                        </a>
                                    </h3>
                                    <span className="text-danger">Multiple Modules</span> | <span><b>Not Available until</b> May 20 at 12:00am</span> | <span><b>Due</b> May 27 at 11:59pm | 100 pts</span>
                                </div>
                                <div className="ms-auto p-2 my-auto">
                                    <AssignmentControlButtons />
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div >
    );
}
