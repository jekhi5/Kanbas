import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";

export default function QuizControls() {
    return (
        <div id="wd-quizzes">
            <div id="wd-quizzes">
                <div className="row mb-4">
                    <div className="col-6">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white rounded-0 h-100 border-end-0" id="basic-addon1">
                                    <CiSearch className="fs-6" />
                                </span>
                            </div>
                            <input type="text" className="form-control py-2 border-start-0" placeholder="Search..." id="wd-search-quizzes" />
                        </div>
                    </div>
                    <div className="col-6">
                        <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end">
                            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                            Quiz</button>
                        <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-1 float-end">
                            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                            Group</button>
                    </div>
                </div>
            </div>
        </div>
    );
}