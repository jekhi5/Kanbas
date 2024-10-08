import { Link } from "react-router-dom";

export default function MUSC1112() {
    return (
        <div className="wd-dashboard-course col" style={{ width: "260px" }}>
            <div className="card rounded-3 overflow-hidden">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/1112/Home">
                    <img src={require("../../public/images/Jazz.jpg")} alt="react logo" width="100%" height={160} />
                    <div className="card-body">
                        <h5 className="wd-dashboard-course-title card-title">
                            MUSC1112
                        </h5>
                        <p className="wd-dashboard-course-title card-text">
                            Jazz
                        </p>
                        <button className="btn btn-primary"> Go </button>
                    </div>
                </Link>
            </div>
        </div>
    );
}