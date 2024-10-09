import { Link } from "react-router-dom";

export default function CS1234() {
    return (
        <div className="wd-dashboard-course">
            <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
                <img src={require("../../public/images/reactjs.jpg")} alt="react logo" width={200} />
                <div>
                    <h5>
                        CS1234 React JS
                    </h5>
                    <p className="wd-dashboard-course-title">
                        Full Stack software developer
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
    );
}