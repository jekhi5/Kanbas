import { Link } from "react-router-dom";

export default function ENGW1115() {
    return (
        <div className="wd-dashboard-course">
            <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1115/Home">
                <img src={require("../../public/images/reactjs.jpg")} alt="react logo" width={200} />
                <div>
                    <h5>
                        ENGW1115
                    </h5>
                    <p className="wd-dashboard-course-title">
                        First Year Writing
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
    );
}