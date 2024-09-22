import { Link } from "react-router-dom";

export default function CS3000() {
    return (
        <div className="wd-dashboard-course">
            <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/3000/Home">
                <img src={require("../../public/images/reactjs.jpg")} alt="react logo" width={200} />
                <div>
                    <h5>
                        CS3000
                    </h5>
                    <p className="wd-dashboard-course-title">
                        Object Oriented Design
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
    );
}