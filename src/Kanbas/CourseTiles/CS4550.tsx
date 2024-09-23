import { Link } from "react-router-dom";

export default function CS4550() {
    return (
        <div className="wd-dashboard-course">
            <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/4550/Home">
                <img src={require("../../public/images/reactjs.jpg")} alt="react logo" width={200} />
                <div>
                    <h5>
                        CS4550
                    </h5>
                    <p className="wd-dashboard-course-title">
                        Foundations of Software Engineering
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
    );
}