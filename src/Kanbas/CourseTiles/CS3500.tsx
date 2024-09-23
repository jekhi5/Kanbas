import { Link } from "react-router-dom";

export default function CS3500() {
    return (
        <div className="wd-dashboard-course">
            <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/2500/Home">
                <img src={require("../../public/images/Algorithms.jpg")} alt="react logo" width={200} />
                <div>
                    <h5>
                        CS3500
                    </h5>
                    <p className="wd-dashboard-course-title">
                        Algorithms
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
    );
}