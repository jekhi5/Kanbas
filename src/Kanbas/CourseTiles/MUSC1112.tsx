import { Link } from "react-router-dom";

export default function MUSC1112() {
    return (
        <div className="wd-dashboard-course">
            <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1112/Home">
                <img src={require("../../public/images/Jazz.jpg")} alt="react logo" width={200} />
                <div>
                    <h5>
                        MUSC1112
                    </h5>
                    <p className="wd-dashboard-course-title">
                        Jazz
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
    );
}