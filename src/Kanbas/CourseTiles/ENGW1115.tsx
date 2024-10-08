import { Link } from "react-router-dom";

export default function ENGW1115() {
    return (
        <div className="wd-dashboard-coursecol" style={{ width: "260px" }}>
            <div className="card rounded-3 overflow-hidden">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/1115/Home">
                    <img src={require("../../public/images/Writing.jpg")} alt="react logo" width="100%" height={160} />
                    <div className="card-body">
                        <h5 className="wd-dashboard-course-title card-title">
                            ENGW1115
                        </h5>
                        <p className="wd-dashboard-course-title card-text">
                            First Year Writing
                        </p>
                        <button className="btn btn-primary"> Go </button>
                    </div>
                </Link>
            </div>
        </div>
    );
}