import { Link } from "react-router-dom";

export default function CS3000() {
    return (
        <div className="wd-dashboard-course col" style={{ width: "260px" }}>
            <div className="card rounded-3 overflow-hidden">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to="/Kanbas/Courses/3000/Home">
                    <img src={require("../../public/images/OOD.jpg")} alt="react logo" width="100%" height={160} />
                    <div className="card-body">
                        <h5 className="wd-dashboard-course-title card-title">
                            CS3000
                        </h5>
                        <p className="wd-dashboard-course-title card-text">
                            Object Oriented Design
                        </p>
                        <button className="btn btn-primary"> Go </button>
                    </div>
                </Link>
            </div>
        </div>
    );
}